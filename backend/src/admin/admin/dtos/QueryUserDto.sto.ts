import { IsEnum } from 'class-validator';

export class QueryUserDto {
  @IsEnum(['admin', 'agency', 'employee', 'jobseeker'], { message: 'Role must be admin, agency, employee or jobseeker' })
  role?: 'admin' | 'agency' | 'employee' | 'jobseeker';

  @IsEnum(['active', 'inactive'], { message: 'Status must be active or inactive' })
  status?: 'active' | 'inactive';
}