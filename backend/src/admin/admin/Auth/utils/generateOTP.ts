import { randomInt } from 'crypto';

export class GenerateOTP {
    create(): string {
        const otp = randomInt(100000, 1000000);
        return otp.toString();
    }
}
