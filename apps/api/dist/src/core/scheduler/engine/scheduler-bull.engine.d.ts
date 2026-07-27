export declare class SchedulerBullEngine {
    private readonly logger;
    scheduleJob(jobId: string, payload: any, rruleString?: string, cron?: string): Promise<{
        status: string;
        jobId: string;
    }>;
    recoverMissedExecutions(): Promise<boolean>;
}
//# sourceMappingURL=scheduler-bull.engine.d.ts.map