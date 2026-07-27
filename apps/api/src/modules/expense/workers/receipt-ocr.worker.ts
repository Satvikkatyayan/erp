import { Injectable } from '@nestjs/common';
import { IWorker } from '../../../core/execution/interfaces/IWorker';
import { IWorkerResult } from '../../../core/execution/interfaces/IWorkerResult';

@Injectable()
export class ReceiptOCRWorker implements IWorker<any> {
  async execute(job: any): Promise<IWorkerResult> {
    // OCR logic
    return { success: true };
  }
}
