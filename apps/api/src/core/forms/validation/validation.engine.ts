import { Injectable, Logger } from '@nestjs/common';
import { RuleEvaluationAdapter } from './rule-evaluation-adapter';

@Injectable()
export class FormValidationEngine {
  private readonly logger = new Logger(FormValidationEngine.name);

  constructor(private ruleAdapter: RuleEvaluationAdapter) {}

  async validate(formConfig: any, payload: any) {
    const errors = [];
    const calculated = { ...payload };

    // 1. Evaluate Conditional Visibility & Calculated Fields
    for (const condition of formConfig.conditions || []) {
       if (condition.type === 'CALCULATED') {
           const result = await this.ruleAdapter.evaluate(condition.ast, payload);
           calculated[condition.targetField] = result;
       }
       if (condition.type === 'VISIBILITY') {
           const isVisible = await this.ruleAdapter.evaluate(condition.ast, payload);
           calculated[`__visible_${condition.targetField}`] = isVisible;
       }
    }

    // 2. Evaluate Hard Validation Rules
    for (const validation of formConfig.validations || []) {
       if (validation.rule === 'MIN') {
          const val = calculated[validation.field];
          if (val < validation.expected) {
              errors.push({
                  field: validation.field,
                  rule: validation.rule,
                  expected: validation.expected,
                  actual: val,
                  message: validation.messageKey || `Value must be at least ${validation.expected}`
              });
          }
       }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      calculatedPayload: calculated
    };
  }
}