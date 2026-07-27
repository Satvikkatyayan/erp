import { BudgetAction } from '../constants/expense.enums';
export interface IExpensePolicyContextData {
    policyVersionId: string;
    rulesSnapshot?: any;
}
export interface IBudgetContextData {
    budgetId?: string;
    departmentId?: string;
}
export interface IApprovalContextData {
    approvalMatrixVersionId: string;
}
export interface ICurrencyContextData {
    baseCurrency: string;
    transactionCurrency: string;
    exchangeRate?: number;
}
import { Context } from '../../../core/context/context.interface';
export interface IExpenseDomainContextData extends Context {
    tenant: {
        id: string;
    };
    organization: {
        id: string;
    };
    employee: {
        id: string;
        departmentId: string;
        roleId?: string;
    };
    policyContext: IExpensePolicyContextData;
    budgetContext: IBudgetContextData;
    approvalContext: IApprovalContextData;
    currencyContext: ICurrencyContextData;
    requestMetadata: {
        ipAddress?: string;
        userAgent?: string;
        timestamp: Date;
    };
}
export interface IExpenseRiskAssessmentResult {
    score: number;
    flags: Array<{
        rule: string;
        weight: number;
    }>;
}
export interface IBudgetEvaluationResult {
    action: BudgetAction;
    availableAmount: number;
    exceededBy?: number;
}
//# sourceMappingURL=expense.types.d.ts.map