import { IsDefined, IsEmail, IsNotEmpty, Max, MaxLength } from "class-validator";

export class VerifyOtpDto {

    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @MaxLength(6)
    otp: string;
}