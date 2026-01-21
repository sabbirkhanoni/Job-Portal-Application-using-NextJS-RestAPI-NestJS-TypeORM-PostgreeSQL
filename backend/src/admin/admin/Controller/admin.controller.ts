import {Controller,Get,Patch,Delete,Param,Body,Query, BadRequestException, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { AdminService } from '../Services/admin.service';
import { UpdateUserStatusDto } from '../dtos/UpdateUserStatusDto.dto';
import { UpdateJobStatusDto } from '../dtos/UpdateJobStatusDto.dto';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // users
  @UseGuards(AuthGuard)
  @Get('users')
  async getAllUsers() {
      return {
        success: true,
        message: 'Users retrieved successfully',
        data : await this.adminService.getAllUsers()
      };
  }

  @Get('user/:id')
  async getUser(
    @Param('id') id: number
  ) { 
      return {
        success: true,
        message: 'User retrieved successfully',
        data : await this.adminService.getUserById(id)
      };
  }

  @Patch('user/:id/status')
  @UsePipes(new ValidationPipe())
  async updateUserStatus(
    @Param('id') id: number,
    @Body() dto: UpdateUserStatusDto,
  ) {
      return {
        success: true,
        message: 'User status updated successfully',
        data : await this.adminService.updateUserStatus(id, dto)
      };
  }

  @Delete('user/:id')
  async deleteUser(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'User deleted successfully',
        data : await this.adminService.deleteUser(id)
      };
  }

  // employee
  @Get('employees')
  async getAllEmployees() {
      return {
        success: true,
        message : 'Employees retrieved successfully',
        data : await this.adminService.getAllEmployees()
      };
  }


  @Get('employees/:id')
  async getEmployeeById(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Employee retrieved successfully',
        data : await this.adminService.getEmployeeById(id)
      };
  }

  @Get('jobseekers')
  async getAllJobSeekers() {
      return {
        success: true,
        message : 'Jobseekers retrieved successfully',
        data : await this.adminService.getAllJobSeekers()
      };
  }


  @Get('jobseekers/:id')
  async getJobSeekerById(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Job Seeker retrieved successfully',
        data : await this.adminService.getJobSeekerById(id)
      };
  }

  

  @Get('employees/pending')
  async getPendingEmployees() {
      return {
        success: true,
        message : 'Pending employees retrieved successfully',
        data : await this.adminService.getPendingEmployees()
      };
  }


  @Patch('employees/:id/approve')
  async approveEmployee(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Employee approved',
        data : await this.adminService.approveEmployee(id)
      };
  }

  @Patch('employees/:id/reject')
  async rejectEmployee(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Employee rejected',
        data : await this.adminService.rejectEmployee(id)
      };
  }

  // job
  @Get('jobs')
  async getAllJobs() {
      return { 
        success: true, 
        message: 'Jobs retrieved successfully',
        data : await this.adminService.getAllJobs()
      };
  }

  @Get('jobs/:id')
  async getJob(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Job retrieved successfully',
        data : await this.adminService.getJobById(id)
      };
  }

  @Patch('jobs/:id/status')
  async updateJobStatus(
    @Param('id') id: number,
    @Body() dto: UpdateJobStatusDto,
  ) {
      return {
        success: true,
        message: 'Job status updated successfully',
        data : await this.adminService.updateJobStatus(id, dto)
      };
  }

  @Delete('jobs/:id')
  async deleteJob(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Job deleted successfully',
        data : await this.adminService.deleteJob(id)
      };
  }

  // job application
  @Get('applications')
  async getAllApplications() {
      return {
        success: true,
        message: 'Applications retrieved successfully',
        data : await this.adminService.getAllApplications()
      };
    }

  @Get('applications/:id')
  async getApplication(
    @Param('id') id: number
  ) {
      const data = await this.adminService.getApplicationById(id);
      return {
        success: true,
        data : await this.adminService.getApplicationById(id)
      };
    }

  @Delete('applications/:id')
  async deleteApplication(
    @Param('id') id: number
  ) {
      return {
        success: true,
        message: 'Application deleted successfully',
        data : await this.adminService.deleteApplication(id)
      };
    }

  // analytics
  @Get('analytics')
  async getAnalytics() {
      return {
        success: true,
        data : await this.adminService.getAnalytics()
      };
    }
}
