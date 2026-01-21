
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateJobStatusDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(['approved', 'banned', 'hold'], { message: 'Status must be approved, banned or hold' })
  status: 'approved' | 'banned' | 'hold';
}