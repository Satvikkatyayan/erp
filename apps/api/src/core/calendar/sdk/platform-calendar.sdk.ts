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