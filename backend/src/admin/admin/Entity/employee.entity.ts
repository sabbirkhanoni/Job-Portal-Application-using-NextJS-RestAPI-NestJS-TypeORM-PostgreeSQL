import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Job } from './job.entity';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';

@Entity()
export class EmployeeProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => RegistrationDetailsEntity)
    @JoinColumn()
    user: RegistrationDetailsEntity;

    @Column()
    companyName: string;

    @Column({ nullable: true })
    companyLogo: string;

    @Column({ nullable: true })
    companyAddress: string;

    @Column({ nullable: true })
    tradeLicense: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    })
    approved: 'pending' | 'approved' | 'rejected';

    @OneToMany(() => Job, (job) => job.postedBy)
    jobs: Job[];
}
