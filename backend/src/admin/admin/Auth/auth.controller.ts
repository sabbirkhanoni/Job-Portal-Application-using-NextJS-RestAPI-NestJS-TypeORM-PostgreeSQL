import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDto } from "./AuthDto/login.dto";
import { AuthService } from "./auth.service";
import { RegistrationDto } from "./AuthDto/register.dto";
import { ForgetPasswordDto } from "./AuthDto/forgetPasswordDto.dto";
import { VerifyOtpDto } from "./AuthDto/verifyOtpDto.dto";
import { ResetPasswordDto } from "./AuthDto/resetPasswordDto.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { AuthGuard } from "./auth.guard";
import { BadRequestException } from '@nestjs/common';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async registration(
        @Body() registrationDto : RegistrationDto
    )
    {
        if(registrationDto.password !== registrationDto.confirmPassword) {
            throw new BadRequestException('Password and Confirm Password do not match');
        }

        return {
            success: true,
            message: "Registration Successfull",
            data : await this.authService.registration(registrationDto)
        }
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body() loginDto : LoginDto,
    ) {
        return {
            success: true,
            message: 'Login successful',
            data: await this.authService.login(loginDto),
        };
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    @UsePipes(new ValidationPipe())
    async logout(
        @Body('userId') userId : number,
    ) {
        return {
            success: true,
            message: 'Logout successful',
            data: await this.authService.logout(userId),
        };
    }

    @Post('forget-password')
    @UsePipes(new ValidationPipe())
    async forgetPasswordRequest(
        @Body() forgetPasswordDto : ForgetPasswordDto,
    ) {
        return {
            success: true,
            message: 'Forget Password request successful',
            data: await this.authService.forgetPasswordRequest(forgetPasswordDto),
        };
    }


    @Post('verify-otp')
    @UsePipes(new ValidationPipe())
    async verifyOtp(
        @Body() verifyOtpDto: VerifyOtpDto,
    ) {
        return {
            success: true,
            message: 'OTP verification successful',
            data: await this.authService.verifyOtp(verifyOtpDto),
        };
    }


    @Post('reset-password')
    @UsePipes(new ValidationPipe())
    async resetPassword(
        @Body() resetPasswordDto : ResetPasswordDto,
    ) {
        return {
            success: true,
            message: 'Password reset successful',
            data: await this.authService.resetPassword(resetPasswordDto),
        };
    }


    //POST /admin/upload-avatar
    @UseGuards(AuthGuard)
    @Post('upload-avatar')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('avatarImage', { 
    fileFilter: (req, file, callback) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        callback(null, true);
        else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 },
    storage : diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
        callback(null, 'avatar-' + Date.now() + file.originalname)
        }})
    }))
    async uploadAvatar(
    @Body('id') id : number,
    @UploadedFile() avatarImage?: Express.Multer.File,
    ) {
    return {
        success: true,
        message: 'Avatar uploaded successfully',
        data: await this.authService.uploadAvatar(id, avatarImage),
    };
    }
}