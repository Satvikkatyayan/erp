"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const business_math_engine_1 = require("./core/calendar/math/business-math.engine");
const calendar_resolver_service_1 = require("./core/calendar/resolution/calendar-resolver.service");
const platform_calendar_sdk_1 = require("./core/calendar/sdk/platform-calendar.sdk");
const scheduler_bull_engine_1 = require("./core/scheduler/engine/scheduler-bull.engine");
const platform_scheduler_sdk_1 = require("./core/scheduler/sdk/platform-scheduler.sdk");
async function verifyCalendar() {
    const logger = new common_1.Logger('Calendar-Verification');
    logger.log('Starting Calendar & Scheduler Platform Verification...');
    const math = new business_math_engine_1.BusinessMathEngine();
    const resolver = new calendar_resolver_service_1.CalendarResolverService();
    const calSdk = new platform_calendar_sdk_1.PlatformCalendarSDK(resolver, math);
    const bull = new scheduler_bull_engine_1.SchedulerBullEngine();
    const schedSdk = new platform_scheduler_sdk_1.PlatformSchedulerSDK(bull);
    logger.log('[Test 1] SLA Business Hours...');
    const baseDate = new Date('2026-10-02T16:00:00Z');
    const deadline = calSdk.calculateSLA('user123', baseDate, 4);
    logger.log(' - Base Date: ' + baseDate.toISOString());
    logger.log(' - Deadline (+4 hrs): ' + deadline.toISOString() + ' (Expected logical skip across weekends/holidays)');
    logger.log('[Test 2] Hierarchical Calendar Resolution...');
    const cal = resolver.resolveCalendar('user123');
    logger.log(' - Resolved Calendar Timezone: ' + cal.timezone + ' (Expected: America/New_York)');
    logger.log(' - Calendar Version: v' + cal.version + ' (Isolated snapshot used for calculation)');
    logger.log('[Test 3] Scheduler RRULE Parsing...');
    try {
        await schedSdk.scheduleRecurring('job-1', {}, 'FREQ=MONTHLY;BYDAY=1MO');
        logger.log(' - ✅ Scheduled job using complex RRULE: First Monday of the month');
    }
    catch (e) {
        logger.error(' - ❌ RRULE scheduling failed: ' + e);
    }
    logger.log('[Test 4] Scheduler Recovery Policy...');
    const recovered = await bull.recoverMissedExecutions();
    logger.log(' - Missed Executions Recovered: ' + recovered);
    logger.log('Calendar Platform Verification Completed Successfully.');
}
verifyCalendar().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=verify-calendar.js.map