import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from '../Controller/admin.controller';
import { AdminService } from '../Services/admin.service';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';
import { EmployeeProfile } from '../Entity/employee.entity';
import { Job } from '../Entity/job.entity';
import { JobApplication } from '../Entity/jobapplication.entity';
import { JobseekerProfile } from '../Entity/jobseeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    RegistrationDetailsEntity,
    EmployeeProfile,
    Job,
    JobApplication,
    JobseekerProfile
  ])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
