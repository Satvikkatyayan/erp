import { Injectable } from '@nestjs/common';
import { IWorker } from '../../../core/execution/interfaces/IWorker';
import { IWorkerResult } from '../../../core/execution/interfaces/IWorkerResult';

@Injectable()
export class ReimbursementWorker implements IWorker<any> {
  async execute(job: any): Promise<IWorkerResult> {
    // Reimbursement logic
    return { success: true };
  }
}
