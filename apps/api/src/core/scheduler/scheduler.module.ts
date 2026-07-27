import { Module } from '@nestjs/common';
import { SchedulerBullEngine } from './engine/scheduler-bull.engine';
import { PlatformSchedulerSDK } from './sdk/platform-scheduler.sdk';

@Module({
  providers: [
    SchedulerBullEngine,
    PlatformSchedulerSDK
  ],
  exports: [PlatformSchedulerSDK]
})
export class SchedulerModule {}
