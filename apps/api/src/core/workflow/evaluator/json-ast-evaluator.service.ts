import { Injectable } from '@nestjs/common';
import { ConditionEvaluator } from './condition-evaluator.interface';

@Injectable()
export class JsonAstEvaluator implements ConditionEvaluator {
  evaluate(condition: any, context: Record<string, any>): boolean {
    if (!condition) return true;
    
    // Simple mock AST evaluator for now
    if (condition.operator === 'EQUALS') {
        return context[condition.field] === condition.value;
    }
    if (condition.operator === 'GREATER_THAN_OR_EQUAL') {
        return context[condition.field] >= condition.value;
    }
    if (condition.AND) {
        return condition.AND.every(cond => this.evaluate(cond, context));
    }
    
    return false;
  }
}