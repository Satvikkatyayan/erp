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