const fs = require('fs');
const path = require('path');

const CORE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core';

const services = {
    'events/event-bus.service.ts': `
import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface DomainEvent {
  eventName: string;
  payload: any;
  timestamp: Date;
}

@Injectable()
export class EventBusService {
  private subject = new Subject<DomainEvent>();

  publish(eventName: string, payload: any) {
    this.subject.next({
      eventName,
      payload,
      timestamp: new Date(),
    });
  }

  subscribe(eventName: string): Observable<DomainEvent> {
    return this.subject.asObservable().pipe(
      filter(event => event.eventName === eventName)
    );
  }
}
`,
    'audit/providers/security-event-logger.interface.ts': `
export interface ISecurityEventLogger {
  logEvent(userId: string | null, eventType: string, details?: any, ipAddress?: string, userAgent?: string): Promise<void>;
}
`,
    'audit/providers/postgres-security-event-logger.service.ts': `
import { Injectable } from '@nestjs/common';
import { ISecurityEventLogger } from './security-event-logger.interface';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PostgresSecurityEventLogger implements ISecurityEventLogger {
  constructor(private prisma: PrismaService) {}

  async logEvent(userId: string | null, eventType: string, details?: any, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.prisma.securityEvent.create({
      data: {
        userId,
        eventType,
        details,
        ipAddress,
        userAgent,
      },
    });
  }
}
`,
    'cache/permission-cache.service.ts': `
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionCacheService {
  // Mocking Redis connection for scaffolding
  private cache = new Map<string, string[]>();

  async getUserPermissions(userId: string): Promise<string[]> {
    return this.cache.get(userId) || [];
  }

  async setUserPermissions(userId: string, permissions: string[]): Promise<void> {
    this.cache.set(userId, permissions);
  }

  async invalidate(userId: string): Promise<void> {
    this.cache.delete(userId);
  }
}
`,
    'policy/services/policy-engine.service.ts': `
import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyEngineService {
  /**
   * Evaluates a set of nested policy rules against a context object.
   * Future implementations will query the DB for rules and evaluate AST expressions.
   */
  async evaluate(policyId: string, context: Record<string, any>): Promise<boolean> {
    // Placeholder evaluation logic
    return true; 
  }
}
`,
    'scope/services/data-scope-engine.service.ts': `
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataScopeEngineService {
  /**
   * Generates Prisma 'where' clauses dynamically based on the user's computed data scope.
   */
  async generatePrismaWhereClause(userId: string, moduleName: string): Promise<Record<string, any>> {
    // Example: { organizationId: '123' } for ORGANIZATION scope
    return {}; 
  }
}
`,
    'approval/services/approval-engine.service.ts': `
import { Injectable } from '@nestjs/common';

export interface ApprovalWorkflow {
  levels: any[];
  isComplete: boolean;
}

@Injectable()
export class ApprovalEngineService {
  /**
   * Calculates the required approval chain for a business action.
   */
  async getApprovalWorkflow(entityType: string, entityId: string): Promise<ApprovalWorkflow> {
    return { levels: [], isComplete: true };
  }
}
`
};

for (const [file, content] of Object.entries(services)) {
    const fullPath = path.join(CORE_DIR, file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim());
}

console.log('Core services scaffolded.');
