import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserStatusDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive' })
  status: 'active' | 'inactive';
}
