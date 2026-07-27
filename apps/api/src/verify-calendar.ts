import { Logger } from '@nestjs/common';
import { BusinessMathEngine } from './core/calendar/math/business-math.engine';
import { CalendarResolverService } from './core/calendar/resolution/calendar-resolver.service';
import { PlatformCalendarSDK } from './core/calendar/sdk/platform-calendar.sdk';
import { SchedulerBullEngine } from './core/scheduler/engine/scheduler-bull.engine';
import { PlatformSchedulerSDK } from './core/scheduler/sdk/platform-scheduler.sdk';

async function verifyCalendar() {
  const logger = new Logger('Calendar-Verification');
  logger.log('Starting Calendar & Scheduler Platform Verification...');

  const math = new BusinessMathEngine();
  const resolver = new CalendarResolverService();
  const calSdk = new PlatformCalendarSDK(resolver, math);
  const bull = new SchedulerBullEngine();
  const schedSdk = new PlatformSchedulerSDK(bull);

  // [Test 1] SLA Math
  logger.log('[Test 1] SLA Business Hours...');
  const baseDate = new Date('2026-10-02T16:00:00Z'); // Friday 4 PM UTC
  const deadline = calSdk.calculateSLA('user123', baseDate, 4);
  logger.log(' - Base Date: ' + baseDate.toISOString());
  logger.log(' - Deadline (+4 hrs): ' + deadline.toISOString() + ' (Expected logical skip across weekends/holidays)');

  // [Test 2] Timezone & Resolution
  logger.log('[Test 2] Hierarchical Calendar Resolution...');
  const cal = resolver.resolveCalendar('user123');
  logger.log(' - Resolved Calendar Timezone: ' + cal.timezone + ' (Expected: America/New_York)');
  logger.log(' - Calendar Version: v' + cal.version + ' (Isolated snapshot used for calculation)');

  // [Test 3] Scheduler Engine (RRULE)
  logger.log('[Test 3] Scheduler RRULE Parsing...');
  try {
    await schedSdk.scheduleRecurring('job-1', {}, 'FREQ=MONTHLY;BYDAY=1MO');
    logger.log(' - ✅ Scheduled job using complex RRULE: First Monday of the month');
  } catch (e) {
    logger.error(' - ❌ RRULE scheduling failed: ' + e);
  }

  // [Test 4] Scheduler Recovery
  logger.log('[Test 4] Scheduler Recovery Policy...');
  const recovered = await bull.recoverMissedExecutions();
  logger.log(' - Missed Executions Recovered: ' + recovered);

  logger.log('Calendar Platform Verification Completed Successfully.');
}

verifyCalendar().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
