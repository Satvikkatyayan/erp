const fs = require('fs');
const path = require('path');

const FORMS_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\forms';

const directories = [
    path.join(FORMS_DIR, 'registry'),
    path.join(FORMS_DIR, 'validation'),
    path.join(FORMS_DIR, 'schema'),
    path.join(FORMS_DIR, 'submission'),
    path.join(FORMS_DIR, 'sdk'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    // ----------------------------------------------------
    // FIELD REGISTRY
    // ----------------------------------------------------
    [path.join(FORMS_DIR, 'registry', 'field-registry.ts')]: `
import { Injectable } from '@nestjs/common';

export interface FieldDefinition {
  type: string;
  defaultConfig: any;
  accessibility: any;
  serialize: (val: any) => any;
}

@Injectable()
export class FieldRegistry {
  private fields = new Map<string, FieldDefinition>();

  constructor() {
    this.register({
      type: 'TEXT',
      defaultConfig: { maxLength: 255 },
      accessibility: { role: 'textbox', ariaRequired: false },
      serialize: (val) => String(val || '')
    });
    this.register({
      type: 'NUMBER',
      defaultConfig: { min: 0 },
      accessibility: { role: 'spinbutton', ariaRequired: false },
      serialize: (val) => Number(val || 0)
    });
    this.register({
      type: 'REPEATABLE_GROUP',
      defaultConfig: { minItems: 0, maxItems: 10 },
      accessibility: { role: 'group' },
      serialize: (val) => Array.isArray(val) ? val : []
    });
  }
  
  register(def: FieldDefinition) { this.fields.set(def.type, def); }
  get(type: string) { return this.fields.get(type); }
}
`,
    // ----------------------------------------------------
    // VALIDATION & RULE ADAPTER
    // ----------------------------------------------------
    [path.join(FORMS_DIR, 'validation', 'rule-evaluation-adapter.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
// Imagine this imports RuleEngineService from Stage 2

@Injectable()
export class RuleEvaluationAdapter {
  private readonly logger = new Logger(RuleEvaluationAdapter.name);

  // Mocks passing an AST to the actual Business Rules engine
  async evaluate(ast: any, payload: any): Promise<any> {
    this.logger.debug('Translating Form AST to Stage 2 Business Rules Engine payload...');
    
    // Mock Evaluation
    if (ast.operation === 'MULTIPLY') {
       return (payload[ast.fields[0]] || 0) * ast.multiplier;
    }
    if (ast.operation === 'EQUALS') {
       return payload[ast.field] === ast.value;
    }
    
    return false;
  }
}
`,
    [path.join(FORMS_DIR, 'validation', 'validation.engine.ts')]: `
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
           calculated[\`__visible_\${condition.targetField}\`] = isVisible;
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
                  message: validation.messageKey || \`Value must be at least \${validation.expected}\`
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
`,
    // ----------------------------------------------------
    // SCHEMA RENDERER
    // ----------------------------------------------------
    [path.join(FORMS_DIR, 'schema', 'render-schema-generator.ts')]: `
import { Injectable } from '@nestjs/common';
import { FieldRegistry } from '../registry/field-registry';

@Injectable()
export class RenderSchemaGenerator {
  constructor(private fieldRegistry: FieldRegistry) {}

  generate(formDefinition: any, locale: string) {
    // Resolving mock Localization logic here
    const t = (key: string) => key.toUpperCase() + '_LOCALIZED';

    return {
      schemaVersion: 'v1.0',
      formCode: formDefinition.code,
      layout: {
        type: formDefinition.layoutType || 'VERTICAL_GRID',
        sections: formDefinition.sections.map(sec => ({
          code: sec.code,
          title: t(sec.titleKey),
          isRepeatable: sec.isRepeatable,
          fields: sec.fields.map(f => {
             const baseDef = this.fieldRegistry.get(f.type);
             return {
                code: f.code,
                type: f.type,
                label: t(f.labelKey),
                accessibility: baseDef?.accessibility,
                config: { ...baseDef?.defaultConfig, ...f.config }
             };
          })
        }))
      }
    };
  }
}
`,
    // ----------------------------------------------------
    // SUBMISSION ENGINE
    // ----------------------------------------------------
    [path.join(FORMS_DIR, 'submission', 'submission.engine.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
// Imports for EventBus and StorageSDK simulated

@Injectable()
export class FormSubmissionEngine {
  private readonly logger = new Logger(FormSubmissionEngine.name);

  async processSubmission(formId: string, payload: any, action: 'AUTOSAVE' | 'SUBMIT') {
    if (action === 'AUTOSAVE') {
       this.logger.debug('Persisting FormSubmissionVersion (DRAFT) for Autosave Recovery...');
       return { status: 'DRAFT', submissionId: 'sub-123', version: 2 };
    }
    
    if (action === 'SUBMIT') {
       this.logger.log('Promoting FormSubmission to SUBMITTED state.');
       this.logger.log(' - Routing File Uploads to PlatformStorageSDK...');
       this.logger.log(' - Emitting FormSubmittedEvent to trigger Stage 1 Workflow Engine...');
       return { status: 'UNDER_REVIEW', submissionId: 'sub-123' };
    }
  }
}
`,
    // ----------------------------------------------------
    // PLATFORM SDK
    // ----------------------------------------------------
    [path.join(FORMS_DIR, 'sdk', 'platform-forms.sdk.ts')]: `
import { Injectable } from '@nestjs/common';
import { FormValidationEngine } from '../validation/validation.engine';
import { RenderSchemaGenerator } from '../schema/render-schema-generator';
import { FormSubmissionEngine } from '../submission/submission.engine';

@Injectable()
export class PlatformFormsSDK {
  constructor(
    private validation: FormValidationEngine,
    private schemaGen: RenderSchemaGenerator,
    private submission: FormSubmissionEngine
  ) {}

  async render(formDefinition: any, locale: string = 'en-US') {
    return this.schemaGen.generate(formDefinition, locale);
  }
  
  async validate(formConfig: any, payload: any) {
    return this.validation.validate(formConfig, payload);
  }
  
  async submit(formId: string, payload: any, action: 'AUTOSAVE' | 'SUBMIT' = 'SUBMIT') {
    return this.submission.processSubmission(formId, payload, action);
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 11 Forms Platform files scaffolded.');
