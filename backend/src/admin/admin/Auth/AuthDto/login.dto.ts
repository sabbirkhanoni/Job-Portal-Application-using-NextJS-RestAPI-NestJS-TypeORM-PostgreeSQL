import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid Email' })
    email : string;

    @IsDefined()
    @IsNotEmpty()
    password : string;
}