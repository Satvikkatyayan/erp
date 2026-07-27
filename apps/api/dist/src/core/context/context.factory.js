"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextFactory = void 0;
const common_1 = require("@nestjs/common");
const execution_context_1 = require("../execution/execution-context");
let ContextFactory = class ContextFactory {
    createRequestContext(payload) {
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
    createExpenseDomainContext(payload) {
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
    createExecutionContext(payload) {
        return new execution_context_1.ExecutionContext(payload.tenantId || 'unknown', payload.orgId || payload.organizationId || 'unknown', payload.correlationId || 'unknown', payload.occurredAt || new Date(), payload.retryCount || 0, payload.causationId, payload.userId, payload.requestId, payload.metadata);
    }
};
exports.ContextFactory = ContextFactory;
exports.ContextFactory = ContextFactory = __decorate([
    (0, common_1.Injectable)()
], ContextFactory);
//# sourceMappingURL=context.factory.js.map