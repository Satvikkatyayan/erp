$basePath = "d:\erpvvinfratech\apps\api\src\modules\attendance\services\exceptions\detectors"

$detectors = @(
  @("shift-violation", "ShiftViolation"),
  @("missing-attendance", "MissingAttendance"),
  @("missing-checkout", "MissingCheckout"),
  @("duplicate-punch", "DuplicatePunch"),
  @("assignment-conflict", "AssignmentConflict"),
  @("wrong-site", "WrongSite"),
  @("holiday-conflict", "HolidayConflict"),
  @("late-submission", "LateSubmission"),
  @("unauthorized-correction", "UnauthorizedCorrection"),
  @("overtime-threshold", "OvertimeThreshold")
)

foreach ($item in $detectors) {
  $kebab = $item[0]
  $name = $item[1]

  $content = @"
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class $($name)Detector implements IExceptionDetector {
  public readonly identifier = '$($name)Detector';

  async detect(musterId: string, tx: Omit<PrismaService, '`$connect' | '`$disconnect' | '`$on' | '`$transaction' | '`$use' | '`$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    // Scaffold implementation
    return [];
  }
}
"@
  Set-Content -Path "$basePath\$kebab.detector.ts" -Value $content
}
