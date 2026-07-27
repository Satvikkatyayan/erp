import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

export interface SnapshotEmployeeData {
  employeeId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  designationId: string | null;
  designationName: string | null;
  departmentId: string | null;
  departmentName: string | null;
  reportingManagerId: string | null;
}

@Injectable()
export class AttendanceSnapshotService {
  constructor(private readonly prisma: PrismaService) {}

  async createSnapshot(
    musterId: string, 
    siteId: string, 
    projectId: string, 
    date: Date,
    prismaTx?: any // Support transaction boundary
  ) {
    const db = prismaTx || this.prisma;
    
    // Check if snapshot already exists
    const existing = await db.musterSnapshot.findFirst({
      where: { siteId, capturedAt: { gte: new Date(date.setHours(0,0,0,0)), lt: new Date(date.setHours(23,59,59,999)) } }
    });
    
    if (existing) {
      throw new BadRequestException('Snapshot already exists for this site and date.');
    }

    // Resolve employees assigned to this site (branchId in EmpJobAssignment)
    const assignments = await db.empJobAssignment.findMany({
      where: {
        branchId: siteId,
        effectiveFrom: { lte: date },
        OR: [
          { effectiveTo: null },
          { effectiveTo: { gte: date } }
        ]
      },
      include: {
        employee: {
          include: {
            reportingAssignments: {
              where: {
                effectiveFrom: { lte: date },
                OR: [
                  { effectiveTo: null },
                  { effectiveTo: { gte: date } }
                ]
              },
              take: 1
            }
          }
        },
        position: true,
        department: true
      }
    });

    if (assignments.length === 0) {
      throw new BadRequestException('No employees assigned to this site for the given date.');
    }

    const snapshotData: SnapshotEmployeeData[] = assignments.map(a => ({
      employeeId: a.employeeId,
      employeeCode: a.employee.employeeCode,
      firstName: a.employee.firstName,
      lastName: a.employee.lastName,
      designationId: a.positionId,
      designationName: a.position?.title || null,
      departmentId: a.departmentId,
      departmentName: a.department?.name || null,
      reportingManagerId: a.employee.reportingAssignments?.[0]?.managerId || null,
    }));

    return db.musterSnapshot.create({
      data: {
        musterId,
        siteId,
        projectId,
        capturedAt: new Date(),
        snapshotData: snapshotData as any
      }
    });
  }

  async loadSnapshot(snapshotId: string) {
    const snapshot = await this.prisma.musterSnapshot.findUnique({
      where: { id: snapshotId }
    });
    if (!snapshot) throw new BadRequestException('Snapshot not found');
    return snapshot;
  }

  async validateSnapshot(snapshotId: string) {
    const snapshot = await this.loadSnapshot(snapshotId);
    if (!snapshot.snapshotData || !Array.isArray(snapshot.snapshotData) || snapshot.snapshotData.length === 0) {
      throw new BadRequestException('Snapshot is invalid or empty');
    }
    return true;
  }
}
