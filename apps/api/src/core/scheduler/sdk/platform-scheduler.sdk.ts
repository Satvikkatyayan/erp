import { Injectable } from '@nestjs/common';
import { SchedulerBullEngine } from '../engine/scheduler-bull.engine';

@Injectable()
export class PlatformSchedulerSDK {
  constructor(private engine: SchedulerBullEngine) {}

  async scheduleRecurring(jobId: string, payload: any, rruleString: string) {
    return this.engine.scheduleJob(jobId, payload, rruleString);
  }
}