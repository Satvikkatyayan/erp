import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IReceiptRepository } from '../interfaces/repository.interfaces';
export declare class ReceiptService {
    private readonly context;
    private readonly receiptRepo;
    constructor(context: ExpenseDomainContext, receiptRepo: IReceiptRepository);
    uploadReceiptMetadata(itemId: string, metadata: any): Promise<any>;
    generateFingerprint(fileBuffer: Buffer): string;
    checkDuplicate(fingerprint: string): Promise<boolean>;
    persistOcrMetadata(receiptId: string, ocrData: any): Promise<any>;
    deleteReceipt(receiptId: string): Promise<any>;
    validateReceipt(receiptId: string): Promise<boolean>;
}
//# sourceMappingURL=receipt.service.d.ts.map