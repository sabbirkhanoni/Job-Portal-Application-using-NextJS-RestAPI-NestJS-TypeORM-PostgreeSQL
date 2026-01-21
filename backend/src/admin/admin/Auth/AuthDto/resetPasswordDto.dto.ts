import { IsDefined, IsEmail, IsNotEmpty, Max, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email: string;

    @MinLength(6)
    @IsDefined()
    @IsNotEmpty()
    password: string;

    @IsDefined()
    @MinLength(6)
    @IsNotEmpty()
    confirmPassword: string;
}
