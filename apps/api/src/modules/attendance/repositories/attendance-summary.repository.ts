import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AttendanceSummaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLatestByEmployeeAndPeriod(employeeId: string, payrollPeriodId: string, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>) {
    const client = tx || this.prisma;
    return client.attendanceSummary.findFirst({
      where: { employeeId, payrollPeriodId },
      orderBy: { version: 'desc' }
    });
  }

  async save(data: any, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>) {
    const client = tx || this.prisma;
    return client.attendanceSummary.create({
      data
    });
  }
}
