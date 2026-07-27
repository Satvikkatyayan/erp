export declare class CorporateCardQueryService {
    getAssignedCards(employeeId: string): Promise<any[]>;
    getStatements(cardId: string): Promise<any[]>;
    getTransactions(statementId: string): Promise<any[]>;
    getReconciliation(cardId: string): Promise<any>;
    getOutstandingTransactions(employeeId: string): Promise<any[]>;
}
//# sourceMappingURL=corporate-card-query.service.d.ts.map