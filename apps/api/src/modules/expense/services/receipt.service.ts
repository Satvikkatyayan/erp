import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { createHash } from 'crypto';
import { IReceiptRepository, RECEIPT_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(RECEIPT_REPOSITORY_TOKEN) private readonly receiptRepo: IReceiptRepository
  ) {}

  async uploadReceiptMetadata(itemId: string, metadata: any): Promise<any> {
    const ctx = this.context.getContext();
    await this.receiptRepo.saveMetadata(itemId, metadata);
    return { status: 'METADATA_UPLOADED', itemId, tenantId: ctx.tenant.id };
  }

  generateFingerprint(fileBuffer: Buffer): string {
    return createHash('sha256').update(fileBuffer).digest('hex');
  }

  async checkDuplicate(fingerprint: string): Promise<boolean> {
    const duplicate = await this.receiptRepo.findByFingerprint(fingerprint);
    return !!duplicate;
  }

  async persistOcrMetadata(receiptId: string, ocrData: any): Promise<any> {
    return { status: 'OCR_PERSISTED', receiptId };
  }

  async deleteReceipt(receiptId: string): Promise<any> {
    await this.receiptRepo.delete(receiptId);
    return { status: 'DELETED', receiptId };
  }

  async validateReceipt(receiptId: string): Promise<boolean> {
    return true;
  }
}
