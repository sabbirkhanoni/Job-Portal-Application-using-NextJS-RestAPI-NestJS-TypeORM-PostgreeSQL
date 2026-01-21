import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';
import { JobApplication } from './jobapplication.entity';

@Entity()
export class JobseekerProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => RegistrationDetailsEntity)
    @JoinColumn()
    user: RegistrationDetailsEntity;

    @Column({ nullable: true })
    resume: string;

    @Column({ nullable: true })
    skills: string;

    @Column({ nullable: true })
    experience: string;

    @Column({ nullable: true })
    portfolio: string;

    @OneToMany(() => JobApplication, (app) => app.jobseeker)
    applications: JobApplication[];
}
