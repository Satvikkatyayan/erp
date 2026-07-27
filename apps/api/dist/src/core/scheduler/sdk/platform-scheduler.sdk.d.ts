import { SchedulerBullEngine } from '../engine/scheduler-bull.engine';
export declare class PlatformSchedulerSDK {
    private engine;
    constructor(engine: SchedulerBullEngine);
    scheduleRecurring(jobId: string, payload: any, rruleString: string): Promise<{
        status: string;
        jobId: string;
    }>;
}
//# sourceMappingURL=platform-scheduler.sdk.d.ts.map