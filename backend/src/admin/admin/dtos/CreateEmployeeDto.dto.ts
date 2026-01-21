import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(['pending', 'approved', 'rejected'], { message: 'Approval status must be pending, approved or rejected' })
  approved: 'pending' | 'approved' | 'rejected';
}