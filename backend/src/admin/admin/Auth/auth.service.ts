import { BadRequestException, NotFoundException, Get, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegistrationDetailsEntity } from "./auth.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegistrationDto } from "./AuthDto/register.dto";
import { LoginDto } from "./AuthDto/login.dto";
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from "./AuthDto/forgetPasswordDto.dto";
import { GenerateOTP } from "./utils/generateOTP";
import { MailServiceProvider } from "./Mail/mailer.service";
import { VerifyOtpDto } from "./AuthDto/verifyOtpDto.dto";
import { ResetPasswordDto } from "./AuthDto/resetPasswordDto.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RegistrationDetailsEntity) private userRepository: Repository<RegistrationDetailsEntity>,
        private jwtService: JwtService,
        private mailService: MailServiceProvider,
    ) {}

    async registration(registrationDto : RegistrationDto) : Promise<RegistrationDetailsEntity> {

        const existingUser = await this.userRepository.findOne(
            { where: { email: registrationDto.email } }
        );

        if (existingUser) {
            throw new BadRequestException('Email is already registered');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(registrationDto.password, salt);

        const newUser = this.userRepository.create({
            ...registrationDto,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    async login(loginDto: LoginDto) : Promise<{ access_token: string, user: any }> {
        const user = await this.userRepository.findOneBy({ email: loginDto.email });

        if (!user) {
        throw new UnauthorizedException('Invalid Email or Password');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid Email or Password');
        }

        const { password, otp, otpExpiryTime, ...safeUser } = user as any;

        const payload = { id: user.id, email: user.email, role: user.role, fullName: user.fullName };

        const access_token = await this.jwtService.signAsync(payload);
        return { access_token, user: safeUser };
    }

    async logout(userId : number) : Promise<void> {
        //delete jwt token
        
        return;
    }

    async forgetPasswordRequest(forgetPasswordDto : ForgetPasswordDto) : Promise<void> {
        
        const user = await this.userRepository.findOneBy({
            email: forgetPasswordDto.email
        });

        if(!user) {
            throw new NotFoundException('Email is not Registered')
        }

        const otp = new GenerateOTP().create();
        
        const salt = await bcrypt.genSalt();
        const hashedOtp = await bcrypt.hash(otp, salt);

        
        const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);

        
        user.otp = hashedOtp;
        user.otpExpiryTime = otpExpiryTime.getTime();

        await this.userRepository.update(user.id,{
            otp: user.otp,
            otpExpiryTime: user.otpExpiryTime
        });


        try{
            await this.mailService.sendMail(
                user.email,
                'Password Reset OTP',
                `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`
            );
        }catch(err){
            throw new BadRequestException('Failed to send OTP email: ' + err.message);
        }

        return;
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<void> {

        const { email, otp } = verifyOtpDto;

        if (!email || !otp) {
            throw new NotFoundException('Email and OTP must be provided');
        }
        
        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const currentTime = Date.now();
        if (currentTime > user.otpExpiryTime) {
            throw new BadRequestException('OTP has expired');
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp);
        if (!isOtpValid) {
            throw new NotFoundException('Invalid OTP');
        }

        return;
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
        const { email, password, confirmPassword} = resetPasswordDto;

        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);


        await this.userRepository.update(user.id, {
            password: hashedPassword,
            otp: "",
            otpExpiryTime: 0,
        });

        return;
    }

    async uploadAvatar(
        id: number,
        avatarImageFile?: Express.Multer.File
        ): Promise<{ avatarUrl: string }> {

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!avatarImageFile) {
            throw new BadRequestException('No file uploaded');
        }

        // Normalize path (Windows → URL safe)
        const normalizedPath = avatarImageFile.path.replace(/\\/g, '/');

        // Build public URL
        const avatarUrl = `${process.env.BASE_URL}/${normalizedPath}`;

        await this.userRepository.update(id, {
            avatar: avatarUrl,
        });

        return { avatarUrl };
        }


}