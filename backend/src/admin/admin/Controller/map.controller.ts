import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AddressService } from '../Services/map.service';

@Controller('map')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('suggestions')
  async getAddressSuggestions(@Query('input') input: string) {
    try {
      const data = await this.addressService.getSuggestions(input);
      return {
        success: true,
        message: 'Address suggestions fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch address suggestions: ' + error.message,
      );
    }
  }

  @Get('coordinates')
  async getCoordinates(@Query('address') address: string) {
    try {
      const data = await this.addressService.getAddressCoordinates(address);

      return {
        success: true,
        message: 'Coordinates fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch coordinates: ' + error.message,
      );
    }
  }

  @Get('distance-time')
  async getDistanceAndTime(
    @Query('origin') originAddress: string,
    @Query('destination') destinationAddress: string
    ) {
    try {
        const data = await this.addressService.getDistanceAndTime(
        originAddress,
        destinationAddress,
        );

        return {
        success: true,
        message: 'Distance and time calculated successfully',
        data,
        };
    } catch (error) {
        throw new BadRequestException(
        'Failed to calculate distance/time: ' + error.message,
        );
    }
  }

}
