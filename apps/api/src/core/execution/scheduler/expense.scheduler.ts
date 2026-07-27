import { Injectable } from '@nestjs/common';
import { IJobScheduler } from '../interfaces/IJobScheduler';

@Injectable()
export class ExpenseScheduler implements IJobScheduler {
  async scheduleJob(jobName: string, payload: any, delayMs?: number): Promise<void> {
    // Abstract scheduling logic
  }

  async cancelJob(jobId: string): Promise<void> {
    // Abstract cancellation logic
  }

  async scheduleReservationExpiry(reservationId: string, delayMs: number): Promise<void> {}

  async scheduleReimbursementRetry(reimbursementId: string, delayMs: number): Promise<void> {}

  async scheduleOcrRetry(receiptId: string, delayMs: number): Promise<void> {}

  async scheduleReplay(projectionId: string): Promise<void> {}

  async scheduleStaleProjectionRefresh(projectionId: string): Promise<void> {}
}
