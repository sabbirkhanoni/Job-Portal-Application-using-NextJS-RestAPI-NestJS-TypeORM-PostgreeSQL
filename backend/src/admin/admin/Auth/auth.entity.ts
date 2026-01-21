import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegistrationDetailsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({
        type: 'enum',
        enum: ['admin', 'agency', 'employee', 'jobseeker'],
        default: 'jobseeker',
    })
    role: 'admin' | 'agency' | 'employee' | 'jobseeker';

    @Column({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'inactive',
    })
    status: 'active' | 'inactive';

    @Column({ nullable: true })
    otp: string;

    @Column({ type: 'bigint', nullable: true })
    otpExpiryTime: number;
}
