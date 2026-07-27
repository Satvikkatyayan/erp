import { Injectable } from '@nestjs/common';
import { GenerateAttendanceSummaryCommand } from '../generate-attendance-summary.command';
import { AttendanceCalculationService } from '../../services/attendance-calculation.service';
import { PrismaService } from '../../../../common/prisma/prisma.service';

@Injectable()
export class GenerateAttendanceSummaryHandler {
  constructor(
    private readonly calculationService: AttendanceCalculationService,
    private readonly prisma: PrismaService
  ) {}

  async execute(command: GenerateAttendanceSummaryCommand): Promise<any> {
    // Wrap entire generation inside a transaction
    return this.prisma.$transaction(async (tx) => {
      return this.calculationService.generateAndPersistSummary(
        command.employeeId,
        command.payrollPeriodId,
        command.generatedById,
        tx
      );
    });
  }
}
