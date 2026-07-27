import { ClsService, ClsStore } from 'nestjs-cls';
import { Context } from './context.interface';
export interface RequestContext extends ClsStore, Context {
    branchId?: string;
    employeeId?: string;
    timezone?: string;
    locale?: string;
}
export declare class RequestContextService {
    private readonly cls;
    constructor(cls: ClsService<RequestContext>);
    get userId(): string;
    get organizationId(): string;
    get branchId(): string;
    get employeeId(): string;
    get timezone(): string;
    get locale(): string;
    get correlationId(): string;
    get requestId(): string;
    setContext(key: keyof RequestContext, value: string): void;
}
//# sourceMappingURL=request-context.service.d.ts.map