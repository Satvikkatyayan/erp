const fs = require('fs');
const path = require('path');

const basePath = 'd:\\erpvvinfratech\\apps\\api\\src\\modules\\attendance\\services\\exceptions\\detectors';
if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

const detectors = [
  { name: 'ShiftViolation', type: 'SHIFT_VIOLATION' },
  { name: 'MissingAttendance', type: 'MISSING_ATTENDANCE' },
  { name: 'MissingCheckout', type: 'MISSING_CHECKOUT' },
  { name: 'DuplicatePunch', type: 'DUPLICATE_PUNCH' },
  { name: 'AssignmentConflict', type: 'UNASSIGNED_EMPLOYEE' },
  { name: 'WrongSite', type: 'WRONG_SITE' },
  { name: 'HolidayConflict', type: 'HOLIDAY_CONFLICT' },
  { name: 'LateSubmission', type: 'LATE_SUBMISSION' },
  { name: 'UnauthorizedCorrection', type: 'UNAUTHORIZED_CORRECTION' },
  { name: 'OvertimeThreshold', type: 'OVERTIME_THRESHOLD' }
];

detectors.forEach(d => {
  const kebab = d.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const content = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class ${d.name}Detector implements IExceptionDetector {
  public readonly identifier = '${d.name}Detector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>): Promise<ExceptionDetectionResult[]> {
    // In a real implementation, this runs complex analysis queries
    // Returning an empty array for scaffolding purposes to ensure successful compilation
    return [];
  }
}
`;
  fs.writeFileSync(path.join(basePath, \`\${kebab}.detector.ts\`), content);
});
