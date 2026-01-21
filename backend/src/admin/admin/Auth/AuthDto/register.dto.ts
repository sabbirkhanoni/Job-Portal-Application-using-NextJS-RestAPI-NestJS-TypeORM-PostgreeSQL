import { IsDefined, IsEmail, IsEnum, IsNotEmpty, Matches, MaxLength, Min, MinLength } from "class-validator";

export class RegistrationDto {
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name should only contain alphabets and spaces' })
    @IsNotEmpty()
    @IsDefined()
    fullName: string;

    @IsEmail({}, { message: 'Invalid Email' })
    @IsDefined()
    email: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message : 'Password must not exceed 20 characters' })
    @IsNotEmpty()
    @IsDefined()
    password: string;

    @IsDefined()
    @IsNotEmpty()
    confirmPassword: string;

    @IsDefined()
    @IsNotEmpty()
    @IsEnum(['admin', 'agency', 'employee', 'jobseeker'], { message: 'Role must be one of the following: admin, agency, employee, jobseeker' })
    role: 'admin' | 'agency' | 'employee' | 'jobseeker';
}