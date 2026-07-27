import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutingResolverService {
  resolveRecipients(eventKey: string, context: any): string[] {
    // Mock dynamic routing evaluation
    if (eventKey === 'EXPENSE_SUBMITTED') {
      return ['ManagerId123', 'FinanceId456']; // Resolving array dynamically
    }
    return [context.userId]; // Default fallback
  }
}