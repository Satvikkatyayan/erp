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
