import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) {}

  async getSuggestions(input: string): Promise<any[]> {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    if (!apiKey) {
      throw new BadRequestException(
        'Geoapify API key is not set in environment variables',
      );
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      input,
    )}&limit=5&apiKey=${apiKey}`;

    try {
      console.log('Autocomplete URL:', url);

      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      console.log('Autocomplete Response:', JSON.stringify(data, null, 2));

      if (data.features && data.features.length > 0) {
        return data.features.map((feature) => ({
          address: feature.properties.formatted,
          name: feature.properties.name || feature.properties.formatted,
          coordinates: {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          },
          type: feature.properties.result_type,
          country: feature.properties.country,
          state: feature.properties.state,
          city: feature.properties.city,
        }));
      }

      return [];
    } catch (error) {
      console.error('Error in Address Suggestion:', error.message);
      throw new BadRequestException(
        'Geoapify request failed: ' + error.message,
      );
    }
  }

  async getAddressCoordinates(address: string): Promise<any> {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    if (!apiKey) {
        throw new BadRequestException(
        'Geoapify API key is not set in environment variables',
        );
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address,
    )}&apiKey=${apiKey}`;

    try {
        const response = await firstValueFrom(this.httpService.get(url));
        const data = response.data;

        if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;

        return { lat, lng };
        } else {
        throw new BadRequestException(
            'No coordinates found for this address',
        );
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw new BadRequestException(
        'Geoapify request failed: ' + error.message,
        );
    }
  }

  async getDistanceAndTime(originAddress: string, destinationAddress: string): Promise<any> {
    const apiKey = process.env.GEOAPIFY_API_KEY;

    if (!apiKey) {
      throw new BadRequestException(
        'Geoapify API key is not set in environment variables',
      );
    }

    try {
      // Step 1: Get coordinates for both addresses
      console.log('Geocoding origin:', originAddress);
      console.log('Geocoding destination:', destinationAddress);

      const originCoords = await this.getAddressCoordinates(originAddress);
      const destinationCoords = await this.getAddressCoordinates(destinationAddress);

      console.log('Origin:', originCoords);
      console.log('Destination:', destinationCoords);

      const originLocation = [originCoords.lng, originCoords.lat];
      const destLocation = [destinationCoords.lng, destinationCoords.lat];

      // Step 2: Call Geoapify Route Matrix API
      const url = `https://api.geoapify.com/v1/routematrix?apiKey=${apiKey}`;

      const body = {
        mode: 'drive',
        sources: [{ location: originLocation }],
        targets: [{ location: destLocation }],
        units: 'metric',
      };

      console.log('Route Matrix Body:', JSON.stringify(body, null, 2));

      const response = await firstValueFrom(
        this.httpService.post(url, body, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      const data = response.data;

      console.log('Route Matrix Response:', JSON.stringify(data, null, 2));

      // Extract distance + time
      if (
        data.sources_to_targets &&
        data.sources_to_targets.length > 0 &&
        data.sources_to_targets[0].length > 0
      ) {
        const result = data.sources_to_targets[0][0];

        const distance = result.distance; // meters
        const duration = result.time; // seconds

        const distanceInKm = distance / 1000;
        const durationInMin = duration / 60;

        return {
          distanceInKm,
          durationInMin,
        };
      } else {
        throw new BadRequestException(
          'No distance/time data returned from Geoapify API',
        );
      }
    } catch (error) {
      console.error('Error in getDistanceAndTime:', error.message);

      throw new BadRequestException(
        'Geoapify request failed: ' + error.message,
      );
    }
  }
}
