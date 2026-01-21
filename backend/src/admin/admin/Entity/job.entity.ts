import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { EmployeeProfile } from './employee.entity';
import { JobApplication } from './jobapplication.entity';


@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    salary: string;

    @Column({
        type: 'enum',
        enum: ['approved', 'banned', 'hold'],
        default: 'hold',
    })
    status: 'approved' | 'banned' | 'hold';

    @Column({ nullable: true })
    longitude: string;

    @Column({ nullable: true })
    latitude: string;

    @ManyToOne(() => EmployeeProfile, (emp) => emp.jobs)
    postedBy: EmployeeProfile;

    @OneToMany(() => JobApplication, (app) => app.job)
    applications: JobApplication[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
