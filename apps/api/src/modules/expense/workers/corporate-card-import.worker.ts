import { Injectable } from '@nestjs/common';
import { IWorker } from '../../../core/execution/interfaces/IWorker';
import { IWorkerResult } from '../../../core/execution/interfaces/IWorkerResult';

@Injectable()
export class CorporateCardImportWorker implements IWorker<any> {
  async execute(job: any): Promise<IWorkerResult> {
    // Corporate card import logic
    return { success: true };
  }
}
