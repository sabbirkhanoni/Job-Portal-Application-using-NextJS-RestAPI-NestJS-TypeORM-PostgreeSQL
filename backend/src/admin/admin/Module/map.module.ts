import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AddressController } from '../Controller/map.controller';
import { AddressService } from '../Services/map.service';

@Module({
  imports: [HttpModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
