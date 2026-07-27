import { Module } from '@nestjs/common';
import { BusinessMathEngine } from './math/business-math.engine';
import { CalendarResolverService } from './resolution/calendar-resolver.service';
import { PlatformCalendarSDK } from './sdk/platform-calendar.sdk';

@Module({
  providers: [
    BusinessMathEngine,
    CalendarResolverService,
    PlatformCalendarSDK
  ],
  exports: [PlatformCalendarSDK]
})
export class CalendarModule {}
