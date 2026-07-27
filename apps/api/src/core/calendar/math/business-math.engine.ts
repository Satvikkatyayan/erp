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