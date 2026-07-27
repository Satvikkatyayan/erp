import { PrismaService } from '../../src/common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { AttendanceResult, MusterWorkflowStatus, AttendanceReviewStatus, PunchType, PunchSource } from '@prisma/client';

export class AttendanceTestSeedBuilder {
  constructor(private readonly prisma: PrismaService) {}

  async cleanDatabase() {
    await this.prisma.attendanceException.deleteMany();
    await this.prisma.attendanceSummary.deleteMany();
    await this.prisma.attendancePunch.deleteMany();
    await this.prisma.attendanceSession.deleteMany();
    await this.prisma.attendanceDay.deleteMany();
    await this.prisma.employeeTimeline.deleteMany();
    await this.prisma.musterTimeline.deleteMany();
    await this.prisma.attendanceReview.deleteMany();
    await this.prisma.musterSnapshot.deleteMany();
    await this.prisma.dailySiteMuster.deleteMany();
    
    // @ts-ignore
    await this.prisma.empJobAssignment.deleteMany();
    await this.prisma.empEmployee.deleteMany();
    await this.prisma.payPayrollPeriod.deleteMany();
    // @ts-ignore
    await this.prisma.site.deleteMany();
    // @ts-ignore
    await this.prisma.project.deleteMany();
    // @ts-ignore
    await this.prisma.branch.deleteMany();
    // @ts-ignore
    await this.prisma.organization.deleteMany();
  }

  async buildEnterprise() {
    const orgId = uuidv4();
    const branchId = uuidv4();
    const projectId = uuidv4();
    const siteId = uuidv4();

    // @ts-ignore
    await this.prisma.organization.create({
      data: { id: orgId, name: 'V V Infratech Enterprise', code: 'VV' } as any
    });

    // @ts-ignore
    await this.prisma.branch.create({
      data: { id: branchId, organizationId: orgId, name: 'Main Branch', code: 'MAIN' } as any
    });

    // @ts-ignore
    await this.prisma.project.create({
      data: { id: projectId, organizationId: orgId, branchId: branchId, name: 'Highway Expansion', code: 'HWY' } as any
    });

    // @ts-ignore
    await this.prisma.site.create({
      data: { id: siteId, projectId, name: 'Sector 4', code: 'SEC4' } as any
    });

    return { orgId, branchId, projectId, siteId };
  }

  async buildEmployees(branchId: string, siteId: string) {
    const employeeId = uuidv4();
    const managerId = uuidv4();
    const hrId = uuidv4();

    // @ts-ignore
    await this.prisma.empEmployee.createMany({
      data: [
        { id: employeeId, organizationId: uuidv4(), employeeCode: 'EMP001', firstName: 'Worker', lastName: 'One', status: 'ACTIVE', type: 'FULL_TIME' } as any,
        { id: managerId, organizationId: uuidv4(), employeeCode: 'PM001', firstName: 'Project', lastName: 'Manager', status: 'ACTIVE', type: 'FULL_TIME' } as any,
        { id: hrId, organizationId: uuidv4(), employeeCode: 'HR001', firstName: 'HR', lastName: 'Manager', status: 'ACTIVE', type: 'FULL_TIME' } as any
      ]
    });

    // @ts-ignore
    await this.prisma.empJobAssignment.create({
      data: {
        id: uuidv4(),
        employeeId,
        siteId,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
        isPrimary: true,
        status: 'ACTIVE'
      } as any
    });

    return { employeeId, managerId, hrId };
  }

  async buildPayrollPeriod() {
    const periodId = uuidv4();
    // @ts-ignore
    await this.prisma.payPayrollPeriod.create({
      data: {
        id: periodId,
        name: 'July 2026',
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-07-31'),
        status: 'OPEN'
      } as any
    });
    return { periodId };
  }
}
