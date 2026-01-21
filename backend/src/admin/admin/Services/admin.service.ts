import {Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';
import { EmployeeProfile } from '../Entity/employee.entity';
import { Job } from '../Entity/job.entity';
import { JobApplication } from '../Entity/jobapplication.entity';
import { JobseekerProfile } from '../Entity/jobseeker.entity';
import { UpdateUserStatusDto } from '../dtos/UpdateUserStatusDto.dto';
import { UpdateJobStatusDto } from '../dtos/UpdateJobStatusDto.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(RegistrationDetailsEntity)
    private readonly userRepo: Repository<RegistrationDetailsEntity>,
    @InjectRepository(EmployeeProfile)
    private readonly employeeRepo: Repository<EmployeeProfile>,
    @InjectRepository(JobseekerProfile)
    private readonly jobseekerRepo: Repository<JobseekerProfile>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(JobApplication)
    private readonly applicationRepo: Repository<JobApplication>,
  ) {}

  // users
  async getAllUsers(): Promise<any> {
    try {
      return await this.userRepo.find({
        order: { id: 'ASC' },
      });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve users: ' + error.message);
    }
  }

  async getUserById(id: number): Promise<any> {
    try {

      const user = await this.userRepo.findOne({
        where: { id }
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;

    } catch (error) {
      throw new BadRequestException('Failed to retrieve user: ' + error.message);
    }
  }

  async updateUserStatus(id: number, dto: UpdateUserStatusDto): Promise<any> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user){
        throw new NotFoundException(`User with id ${id} not found`);
      }

      user.status = dto.status;

      return await this.userRepo.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to update user status: ' + error.message);
    }
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user){
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.userRepo.remove(user);
    } catch (error) {
      throw new BadRequestException('Failed to delete user: ' + error.message);
    }
  }

  // employee
  async getAllEmployees(): Promise<any> {
    try {

      return await this.employeeRepo.find({ relations: ['user'] });

    } catch (error) {
      throw new BadRequestException('Failed to retrieve employees: ' + error.message);
    }
  }

  async getEmployeeById(id: number): Promise<any> {
  try {
    const employee = await this.employeeRepo.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  } catch (error) {
    throw new BadRequestException('Failed to retrieve employee: ' + error.message);
  }
}

  async getPendingEmployees(): Promise<any> {
    try {
      return await this.employeeRepo.find({
        where: { approved: 'pending' },
        relations: ['user'],
      });

    } catch (error) {
      throw new BadRequestException('Failed to retrieve pending employees: ' + error.message);
    }
  }

  async approveEmployee(id: number): Promise<any> {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!employee) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }

      employee.approved = 'approved';
      return await this.employeeRepo.save(employee);
    } catch (error) {
      throw new BadRequestException('Failed to approve employee: ' + error.message);
    }
  }

  async rejectEmployee(id: number): Promise<any> {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!employee) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }

      employee.approved = 'rejected';
      return await this.employeeRepo.save(employee);
    } catch (error) {
      throw new BadRequestException('Failed to reject employee: ' + error.message);
    }
  }

  //employee status
  async updateEmployeeStatus(id: number, dto: { approved: string }): Promise<any> {
    try {
      const employee = await this.employeeRepo.findOne({ 
        where: { id },
        relations: ['user']
      });

      if (!employee) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }
      
      employee.approved = dto.approved as any;
      return await this.employeeRepo.save(employee);
    } catch (error) {
      throw new BadRequestException('Failed to update employee status: ' + error.message);
    }
  }

  async getEmployeesByStatus(status: string): Promise<any> {
    try {

      return await this.employeeRepo.find({
        where: { approved: status as 'pending' | 'approved' | 'rejected' },
        relations: ['user'],
      });
    
    } catch (error) {
      throw new BadRequestException('Failed to retrieve employees by status: ' + error.message);
    }
  }

  async getAllJobSeekers(): Promise<any> {
    try {
      return await this.jobseekerRepo.find({ relations: ['user'] });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve jobseekers: ' + error.message);
    }
  }

  async getJobSeekerById(id: number): Promise<any> {
    try {
      const jobseeker = await this.jobseekerRepo.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!jobseeker) {
        throw new NotFoundException(`Jobseeker with id ${id} not found`);
      }
      return jobseeker;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve jobseeker: ' + error.message);
    }
  }

  // job
  async getAllJobs(): Promise<any> {
    try {

      return await this.jobRepo.find({
        relations: ["postedBy", "applications"]
      });

    } catch (error) {
      throw new BadRequestException('Failed to retrieve jobs: ' + error.message);
    }
  }

  async getJobById(id: number): Promise<any> {
    try {

      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      const job = await this.jobRepo.findOne({
        where: { id },
        relations: ["postedBy", "applications"]
      });

      if (!job) {
        throw new NotFoundException(`Job with id ${id} not found`);
      }

      return job;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve job: ' + error.message);
    }
  }

  async updateJobStatus(id: number, dto: UpdateJobStatusDto): Promise<any> {
    try {

      const job = await this.jobRepo.findOne({ where: { id } });

      if (!job) {
        throw new NotFoundException(`Job with id ${id} not found`);
      }

      job.status = dto.status;
      return await this.jobRepo.save(job);
    } catch (error) {
      throw new BadRequestException('Failed to update job status: ' + error.message);
    }
  }

  async deleteJob(id: number): Promise<any> {
    try {
      const job = await this.jobRepo.findOne({ where: { id } });

      if (!job) {
        throw new NotFoundException(`Job with id ${id} not found`);
      }

      await this.jobRepo.remove(job);
    } catch (error) {
      throw new BadRequestException('Failed to delete job: ' + error.message);
    }
  }

  //job application
  async getAllApplications(): Promise<any> {
    try {
      return await this.applicationRepo.find({
        relations: ['job', 'jobseeker'],
      });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve applications: ' + error.message);
    }
  }

  async getApplicationById(id: number): Promise<any> {
    try {
      const app = await this.applicationRepo.findOne({
        where: { id },
        relations: ['job', 'user'],
      });
      if (!app) {
        throw new NotFoundException(`Application with id ${id} not found`);
      }
      return app;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve application: ' + error.message);
    }
  }

  async deleteApplication(id: number): Promise<any> {
    try {
      const app = await this.applicationRepo.findOne({ where: { id } });
      if (!app) {
        throw new NotFoundException(`Application with id ${id} not found`);                       
      }
      await this.applicationRepo.remove(app);
    } catch (error) {
      throw new BadRequestException('Failed to delete application: ' + error.message);
    }
  }

  // analytics
  async getAnalytics(): Promise<any> {
    try {
      const totalUsers = await this.userRepo.count();
      const totalEmployees = await this.userRepo.count({
        where: { role: 'employee' },
      });
      const totalJobseekers = await this.userRepo.count({
        where: { role: 'jobseeker' },
      });
      const totalJobs = await this.jobRepo.count();
      const activeUsers = await this.userRepo.count({
        where: { status: 'active' },
      });
      const inactiveUsers = totalUsers - activeUsers;
      const pendingApprovals = await this.employeeRepo.count({
        where: { approved: 'pending' },
      });
      const totalApplications = await this.applicationRepo.count();

      return {
        success: true,
        message: 'Analytics retrieved successfully',
        data: {
          totalUsers,
          totalEmployees,
          totalJobseekers,
          totalJobs,
          activeUsers,
          inactiveUsers,
          pendingApprovals,
          totalApplications,
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve analytics: ' + error.message);
    }
  }
}
