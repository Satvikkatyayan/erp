import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeBootstrapService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async provisionDownstreamProfiles(ctx: PlatformContext, employeeId: string) {
    // Seed Attendance Profile, Payroll Profile, Leave Balances
    
    // Register strongly typed reporting datasets
    await this.sdk.reporting.registerDataset(ctx, 'EmployeeHeadcountDataset', {
      organizationId: 'string', branchId: 'string', departmentId: 'string', designationId: 'string',
      employmentType: 'string', activeEmployees: 'number', inactiveEmployees: 'number',
      totalEmployees: 'number', generatedAt: 'date'
    });
    
    await this.sdk.reporting.registerDataset(ctx, 'OrganizationDistributionDataset', {
      organizationId: 'string', branches: 'array', departments: 'array', teams: 'array', headcount: 'number'
    });
    
    await this.sdk.reporting.registerDataset(ctx, 'SkillMatrixDataset', {
      employeeId: 'string', skillId: 'string', proficiency: 'string', certificationStatus: 'string'
    });
    
    await this.sdk.reporting.registerDataset(ctx, 'WorkforceDemographicsDataset', {
      genderDistribution: 'object', ageDistribution: 'object', tenureDistribution: 'object', employmentTypeDistribution: 'object'
    });
    
    await this.sdk.reporting.registerDataset(ctx, 'EmploymentStatusDataset', {
      active: 'number', probation: 'number', suspended: 'number', noticePeriod: 'number', exited: 'number'
    });

    // Register search index via SDK with explicit fields
    await this.sdk.search.index(ctx, 'employees', employeeId, { 
      employeeNumber: 'TEMP-001',
      name: 'John Doe',
      department: 'ENG',
      manager: 'Jane Smith',
      branch: 'HQ',
      designation: 'SSE',
      skills: ['TypeScript', 'Node.js'],
      status: 'JOINED' 
    });
  }
}
