import { RequestContext } from './request-context.service';
import { IExpenseDomainContextData } from '../../modules/expense/types/expense.types';
import { ExecutionContext } from '../execution/execution-context';
export declare class ContextFactory {
    createRequestContext(payload: any): RequestContext;
    createExpenseDomainContext(payload: any): IExpenseDomainContextData;
    createExecutionContext(payload: any): ExecutionContext;
}
//# sourceMappingURL=context.factory.d.ts.map