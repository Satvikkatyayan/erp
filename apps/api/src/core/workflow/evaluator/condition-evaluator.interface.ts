export interface ConditionEvaluator {
  evaluate(condition: any, context: Record<string, any>): boolean;
}