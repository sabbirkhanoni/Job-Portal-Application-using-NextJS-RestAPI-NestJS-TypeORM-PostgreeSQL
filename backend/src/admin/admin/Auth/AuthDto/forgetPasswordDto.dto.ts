import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class ForgetPasswordDto {
    @IsEmail({}, { message: 'Invalid Email' })
    @IsDefined({ message: 'Email is required' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;
}