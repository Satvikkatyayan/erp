const fs = require('fs');
const path = require('path');

const CALENDAR_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\calendar';
const SCHEDULER_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\scheduler';

const directories = [
    path.join(CALENDAR_DIR, 'math'),
    path.join(CALENDAR_DIR, 'resolution'),
    path.join(CALENDAR_DIR, 'sdk'),
    path.join(CALENDAR_DIR, 'api'),
    path.join(SCHEDULER_DIR, 'engine'),
    path.join(SCHEDULER_DIR, 'sdk'),
    path.join(SCHEDULER_DIR, 'api'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    // ----------------------------------------------------
    // CALENDAR MATH & RESOLUTION
    // ----------------------------------------------------
    [path.join(CALENDAR_DIR, 'math', 'business-math.engine.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessMathEngine {
  addBusinessDays(dateUTC: Date, days: number, calendarConfig: any): Date {
    // Mock date arithmetic leaping weekends
    const result = new Date(dateUTC);
    result.setDate(result.getDate() + days + 2); // simplistic mock skipping weekend
    return result;
  }
  
  addBusinessHours(dateUTC: Date, hours: number, calendarConfig: any): Date {
    const result = new Date(dateUTC);
    result.setHours(result.getHours() + hours);
    return result;
  }
  
  calculateSlaDeadline(startUTC: Date, maxHours: number, calendarConfig: any): Date {
    return this.addBusinessHours(startUTC, maxHours, calendarConfig);
  }
}
`,
    [path.join(CALENDAR_DIR, 'resolution', 'calendar-resolver.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarResolverService {
  resolveCalendar(userId: string): any {
    // Mock hierarchy resolution: Employee -> Branch -> Org -> System
    return {
      timezone: 'America/New_York',
      version: 5,
      isExceptionOverride: false
    };
  }
}
`,
    [path.join(CALENDAR_DIR, 'sdk', 'platform-calendar.sdk.ts')]: `
import { Injectable } from '@nestjs/common';
import { CalendarResolverService } from '../resolution/calendar-resolver.service';
import { BusinessMathEngine } from '../math/business-math.engine';

@Injectable()
export class PlatformCalendarSDK {
  constructor(
    private resolver: CalendarResolverService,
    private math: BusinessMathEngine
  ) {}

  addBusinessDays(userId: string, dateUTC: Date, days: number) {
    const cal = this.resolver.resolveCalendar(userId);
    return this.math.addBusinessDays(dateUTC, days, cal);
  }
  
  calculateSLA(userId: string, startUTC: Date, maxHours: number) {
    const cal = this.resolver.resolveCalendar(userId);
    return this.math.calculateSlaDeadline(startUTC, maxHours, cal);
  }
}
`,
    // ----------------------------------------------------
    // SCHEDULER ENGINE
    // ----------------------------------------------------
    [path.join(SCHEDULER_DIR, 'engine', 'scheduler-bull.engine.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { RRule } from 'rrule';

@Injectable()
export class SchedulerBullEngine {
  private readonly logger = new Logger(SchedulerBullEngine.name);

  async scheduleJob(jobId: string, payload: any, rruleString?: string, cron?: string) {
    if (rruleString) {
       try {
         const rule = RRule.fromString(rruleString);
         this.logger.log(\`Scheduling via RRULE: \${rule.toText()}\`);
       } catch (e) {
         this.logger.error('Invalid RRULE');
         throw new Error('Invalid RRULE string');
       }
    } else if (cron) {
       this.logger.log(\`Scheduling via Cron: \${cron}\`);
    }
    
    // Mock dispatch to BullMQ
    return { status: 'SCHEDULED', jobId };
  }
  
  async recoverMissedExecutions() {
    this.logger.log('Executing Missed Execution Recovery Policy: EXECUTE_IMMEDIATELY');
    return true;
  }
}
`,
    [path.join(SCHEDULER_DIR, 'sdk', 'platform-scheduler.sdk.ts')]: `
import { Injectable } from '@nestjs/common';
import { SchedulerBullEngine } from '../engine/scheduler-bull.engine';

@Injectable()
export class PlatformSchedulerSDK {
  constructor(private engine: SchedulerBullEngine) {}

  async scheduleRecurring(jobId: string, payload: any, rruleString: string) {
    return this.engine.scheduleJob(jobId, payload, rruleString);
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 5 Calendar Platform files scaffolded.');
