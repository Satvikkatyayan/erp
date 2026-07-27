export interface IJobScheduler {
  scheduleJob(jobName: string, payload: any, delayMs?: number): Promise<void>;
  cancelJob(jobId: string): Promise<void>;
}
