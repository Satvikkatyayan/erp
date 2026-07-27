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
    
    // 1.5 Generate Employee Number if not provided
    const empNo = payload.employeeNumber || `EMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 2. Create Draft Employee
    const employee = await this.prisma.empEmployee.create({
      data: {
        tenantId: ctx.tenantId,
        organizationId: ctx.organizationId,
        employeeNumber: empNo,
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
