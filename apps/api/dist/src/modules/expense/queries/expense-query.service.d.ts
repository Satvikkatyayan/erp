export declare class ExpenseQueryService {
    getClaim(claimId: string): Promise<any>;
    getEmployeeClaims(employeeId: string): Promise<any[]>;
    getManagerApprovalQueue(managerId: string): Promise<any[]>;
    getFinanceApprovalQueue(): Promise<any[]>;
    getClaimsByStatus(status: string): Promise<any[]>;
    searchClaims(criteria: any): Promise<any[]>;
}
//# sourceMappingURL=expense-query.service.d.ts.map