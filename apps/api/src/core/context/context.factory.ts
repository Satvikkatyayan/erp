import { Injectable } from '@nestjs/common';
import { RequestContext } from './request-context.service';
import { IExpenseDomainContextData } from '../../modules/expense/types/expense.types';
import { ExecutionContext } from '../execution/execution-context';

@Injectable()
export class ContextFactory {
  
  createRequestContext(payload: any): RequestContext {
    return {
      tenantId: payload.tenantId || 'unknown',
      organizationId: payload.orgId || payload.organizationId || 'unknown',
      correlationId: payload.correlationId || 'unknown',
      userId: payload.userId,
      requestId: payload.requestId,
      sessionId: payload.sessionId,
      source: payload.source,
      locale: payload.locale,
      timezone: payload.timezone,
      branchId: payload.branchId,
      employeeId: payload.employeeId,
    };
  }

  createExpenseDomainContext(payload: any): IExpenseDomainContextData {
    return {
      tenantId: payload.tenantId || 'unknown',
      organizationId: payload.orgId || payload.organizationId || 'unknown',
      correlationId: payload.correlationId || 'unknown',
      userId: payload.userId,
      requestId: payload.requestId,
      sessionId: payload.sessionId,
      source: payload.source,
      locale: payload.locale,
      timezone: payload.timezone,
      employee: {
        id: payload.employeeId || 'unknown',
        departmentId: payload.departmentId || 'unknown',
        roleId: payload.roleId,
      },
      organization: { id: payload.orgId || payload.organizationId || 'unknown' },
      tenant: { id: payload.tenantId || 'unknown' },
      policyContext: {
        policyVersionId: payload.policyVersionId || 'default-policy',
      },
      budgetContext: {
        budgetId: payload.budgetId,
        departmentId: payload.departmentId,
      },
      approvalContext: {
        approvalMatrixVersionId: payload.approvalMatrixVersionId || 'default-matrix'
      },
      currencyContext: {
        baseCurrency: payload.baseCurrency || 'USD',
        transactionCurrency: payload.currency || 'USD',
        exchangeRate: payload.exchangeRate,
      },
      requestMetadata: {
        ipAddress: payload.ipAddress,
        userAgent: payload.userAgent,
        timestamp: payload.timestamp || new Date()
      }
    };
  }

  createExecutionContext(payload: any): ExecutionContext {
    return new ExecutionContext(
      payload.tenantId || 'unknown',
      payload.orgId || payload.organizationId || 'unknown',
      payload.correlationId || 'unknown',
      payload.occurredAt || new Date(),
      payload.retryCount || 0,
      payload.causationId,
      payload.userId,
      payload.requestId,
      payload.metadata
    );
  }
}
