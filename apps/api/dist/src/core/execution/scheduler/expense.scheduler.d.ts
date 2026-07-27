import { IJobScheduler } from '../interfaces/IJobScheduler';
export declare class ExpenseScheduler implements IJobScheduler {
    scheduleJob(jobName: string, payload: any, delayMs?: number): Promise<void>;
    cancelJob(jobId: string): Promise<void>;
    scheduleReservationExpiry(reservationId: string, delayMs: number): Promise<void>;
    scheduleReimbursementRetry(reimbursementId: string, delayMs: number): Promise<void>;
    scheduleOcrRetry(receiptId: string, delayMs: number): Promise<void>;
    scheduleReplay(projectionId: string): Promise<void>;
    scheduleStaleProjectionRefresh(projectionId: string): Promise<void>;
}
//# sourceMappingURL=expense.scheduler.d.ts.map