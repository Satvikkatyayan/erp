export class CorporateCardTransactionDto {
  transactionId: string;
  cardId: string;
  amount: number;
  currency: string;
  merchant: string;
  transactionDate: Date;
  isReconciled: boolean;
}
