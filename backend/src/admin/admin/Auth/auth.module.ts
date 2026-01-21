import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationDetailsEntity } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailServiceProvider } from './Mail/mailer.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegistrationDetailsEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn as any },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, MailServiceProvider],
  exports: [MailServiceProvider],
})
export class AuthModule {}
