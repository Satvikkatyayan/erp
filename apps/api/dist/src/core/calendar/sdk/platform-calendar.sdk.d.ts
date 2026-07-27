import { CalendarResolverService } from '../resolution/calendar-resolver.service';
import { BusinessMathEngine } from '../math/business-math.engine';
export declare class PlatformCalendarSDK {
    private resolver;
    private math;
    constructor(resolver: CalendarResolverService, math: BusinessMathEngine);
    addBusinessDays(userId: string, dateUTC: Date, days: number): Date;
    calculateSLA(userId: string, startUTC: Date, maxHours: number): Date;
}
//# sourceMappingURL=platform-calendar.sdk.d.ts.map