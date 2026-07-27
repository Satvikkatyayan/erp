const fs = require('fs');
const path = require('path');

const baseDir = path.join('d:\\erpvvinfratech', 'apps', 'api', 'src', 'modules', 'employee');
const dirs = [
  '',
  'controllers',
  'services',
  'dtos',
  'workers'
];

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const files = {
  'employee.module.ts': `
import { Module } from '@nestjs/common';
import { EmployeeLifecycleService } from './services/employee-lifecycle.service';
import { EmployeeValidationService } from './services/employee-validation.service';
import { EmployeeNumberService } from './services/employee-number.service';
import { EmployeeTimelineService } from './services/employee-timeline.service';
import { EmployeeAssignmentService } from './services/employee-assignment.service';
import { EmployeeDocumentService } from './services/employee-document.service';
import { EmployeeBootstrapService } from './services/employee-bootstrap.service';
import { ComplianceExpirationWorker } from './workers/compliance-expiration.worker';

@Module({
  providers: [
    EmployeeLifecycleService,
    EmployeeValidationService,
    EmployeeNumberService,
    EmployeeTimelineService,
    EmployeeAssignmentService,
    EmployeeDocumentService,
    EmployeeBootstrapService,
    ComplianceExpirationWorker
  ],
  exports: [
    EmployeeLifecycleService,
    EmployeeValidationService,
    EmployeeNumberService,
    EmployeeTimelineService,
    EmployeeAssignmentService,
    EmployeeDocumentService
  ]
})
export class EmployeeModule {}
`,

  'services/employee-lifecycle.service.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { EmployeeBootstrapService } from './employee-bootstrap.service';
import { EmployeeValidationService } from './employee-validation.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeLifecycleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly bootstrap: EmployeeBootstrapService,
    private readonly validator: EmployeeValidationService
  ) {}

  async onboardEmployee(ctx: PlatformContext, payload: any) {
    // 1. Validation
    await this.validator.validateNewHire(ctx, payload);
    
    // 2. Create Draft Employee
    const employee = await this.prisma.empEmployee.create({
      data: {
        tenantId: ctx.tenantId,
        organizationId: ctx.organizationId,
        employeeNumber: payload.employeeNumber,
        status: 'JOINED',
        personalDetails: {
          create: {
            firstName: payload.firstName,
            lastName: payload.lastName,
          }
        },
        jobAssignments: {
          create: {
            positionId: payload.positionId,
            departmentId: payload.departmentId,
            branchId: payload.branchId,
            effectiveFrom: payload.joiningDate
          }
        }
      }
    });

    // 3. Publish Event
    await this.sdk.events.publish(ctx, 'EmployeeCreated', { employeeId: employee.id });
    
    // 4. Trigger Bootstrap Provisioning
    await this.bootstrap.provisionDownstreamProfiles(ctx, employee.id);

    return employee;
  }

  async updateEmployee(ctx: PlatformContext, employeeId: string, payload: any) {
    await this.sdk.events.publish(ctx, 'EmployeeUpdated', { employeeId, payload });
  }

  async transferEmployee(ctx: PlatformContext, employeeId: string, payload: any) {
    await this.sdk.events.publish(ctx, 'EmployeeTransferred', { employeeId, payload });
  }

  async promoteEmployee(ctx: PlatformContext, employeeId: string, payload: any) {
    await this.sdk.events.publish(ctx, 'EmployeePromoted', { employeeId, payload });
  }

  async confirmEmployee(ctx: PlatformContext, employeeId: string) {
    await this.sdk.events.publish(ctx, 'EmployeeConfirmed', { employeeId });
  }

  async suspendEmployee(ctx: PlatformContext, employeeId: string) {
    await this.sdk.events.publish(ctx, 'EmployeeSuspended', { employeeId });
  }

  async terminateEmployee(ctx: PlatformContext, employeeId: string) {
    await this.sdk.events.publish(ctx, 'EmployeeTerminated', { employeeId });
  }

  async assignManager(ctx: PlatformContext, employeeId: string, managerId: string) {
    await this.sdk.events.publish(ctx, 'ManagerAssigned', { employeeId, managerId });
  }

  async markDocumentExpired(ctx: PlatformContext, employeeId: string, documentId: string) {
    await this.sdk.events.publish(ctx, 'DocumentExpired', { employeeId, documentId });
  }

  async completeProbation(ctx: PlatformContext, employeeId: string) {
    await this.sdk.events.publish(ctx, 'ProbationCompleted', { employeeId });
  }
}
`,

  'services/employee-validation.service.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ValidationError } from '../../../core/contracts/errors/platform.error';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeValidationService {
  constructor(private readonly prisma: PrismaService) {}

  async validateNewHire(ctx: PlatformContext, payload: any) {
    // Check duplicates
    const duplicate = await this.prisma.empPersonalDetails.findFirst({
      where: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        employee: { tenantId: ctx.tenantId }
      }
    });

    if (duplicate) {
      throw new ValidationError('Employee with this name might already exist.', ctx.correlationId);
    }

    // Organization Assignment Integrity
    const position = await this.prisma.empPosition.findFirst({
      where: { id: payload.positionId, tenantId: ctx.tenantId, departmentId: payload.departmentId }
    });
    if (!position) {
       throw new ValidationError('Position does not match department or tenant.', ctx.correlationId);
    }

    // Employment Eligibility
    if (payload.age && payload.age < 18) {
       throw new ValidationError('Employee must be at least 18 years old.', ctx.correlationId);
    }
    
    // Reporting Hierarchy Rules
    if (payload.managerId) {
      const manager = await this.prisma.empEmployee.findFirst({ where: { id: payload.managerId, tenantId: ctx.tenantId } });
      if (!manager || manager.status !== 'JOINED') {
         throw new ValidationError('Reporting manager must be an active employee.', ctx.correlationId);
      }
    }

    // Mandatory Documents
    if (payload.requireDocuments && (!payload.documents || payload.documents.length === 0)) {
       throw new ValidationError('Mandatory documents are missing.', ctx.correlationId);
    }
  }
}
`,

  'services/employee-number.service.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeNumberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async generate(ctx: PlatformContext, policyName: string): Promise<string> {
    // 1. Fetch formatting rule from Platform Rules SDK
    const rule = await this.sdk.rules.evaluate(ctx, policyName, {});
    const prefix = rule.prefix || 'EMP';
    
    // 2. Concurrency-safe sequence generation
    // Dummy generation for v1
    const count = await this.prisma.empEmployee.count({ where: { tenantId: ctx.tenantId } });
    return \`\${prefix}-\${(count + 1).toString().padStart(4, '0')}\`;
  }
}
`,

  'services/employee-timeline.service.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async logEvent(employeeId: string, eventType: string, description: string, metadata?: any) {
    return this.prisma.empEmployeeTimeline.create({
      data: {
        employeeId,
        eventType,
        description,
        metadata
      }
    });
  }
}
`,

  'services/employee-assignment.service.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeAssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  // Handles effective dated assignment changes
}
`,

  'services/employee-document.service.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeDocumentService {
  constructor(private readonly prisma: PrismaService) {}
}
`,

  'services/employee-bootstrap.service.ts': `
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
`,

  'workers/compliance-expiration.worker.ts': `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class ComplianceExpirationWorker {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  // Cron job logic to check identity expiry and trigger Notification SDK
}
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, filename), content.trim() + '\n');
}

console.log('Employee Domain scaffolded.');
