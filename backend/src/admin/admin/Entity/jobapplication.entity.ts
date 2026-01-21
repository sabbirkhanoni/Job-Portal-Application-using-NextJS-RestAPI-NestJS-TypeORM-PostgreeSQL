import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Job } from './job.entity';
import { JobseekerProfile } from './jobseeker.entity';

@Entity()
export class JobApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Job, (job) => job.applications)
    job: Job;

    @ManyToOne(() => JobseekerProfile, (js) => js.applications)
    jobseeker: JobseekerProfile;

    @Column({
        type: 'enum',
        enum: ['applied', 'reviewed', 'accepted', 'rejected'],
        default: 'applied',
    })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    appliedAt: Date;
}
