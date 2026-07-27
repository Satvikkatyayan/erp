import { Injectable } from '@nestjs/common';
import { IWorker } from '../../../core/execution/interfaces/IWorker';
import { IWorkerResult } from '../../../core/execution/interfaces/IWorkerResult';

@Injectable()
export class BudgetReservationWorker implements IWorker<any> {
  async execute(job: any): Promise<IWorkerResult> {
    // Budget reservation logic
    return { success: true };
  }
}
