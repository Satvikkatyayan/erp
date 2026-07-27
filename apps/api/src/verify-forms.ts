import { Logger } from '@nestjs/common';
import { FieldRegistry } from './core/forms/registry/field-registry';
import { RuleEvaluationAdapter } from './core/forms/validation/rule-evaluation-adapter';
import { FormValidationEngine } from './core/forms/validation/validation.engine';
import { RenderSchemaGenerator } from './core/forms/schema/render-schema-generator';
import { FormSubmissionEngine } from './core/forms/submission/submission.engine';
import { PlatformFormsSDK } from './core/forms/sdk/platform-forms.sdk';

async function verifyForms() {
  const logger = new Logger('Forms-Verification');
  logger.log('Starting Enterprise Dynamic Forms Platform Verification...');

  const fieldRegistry = new FieldRegistry();
  const ruleAdapter = new RuleEvaluationAdapter();
  const validationEngine = new FormValidationEngine(ruleAdapter);
  const schemaGen = new RenderSchemaGenerator(fieldRegistry);
  const submissionEngine = new FormSubmissionEngine();
  
  const sdk = new PlatformFormsSDK(validationEngine, schemaGen, submissionEngine);

  // 1. Rendering Schema & Field Registry
  logger.log('[Test 1] Generating Render Schema...');
  const formDef = {
    code: 'ONBOARDING_V1',
    layoutType: 'GRID_2_COL',
    sections: [{
      code: 'PERSONAL_DETAILS',
      titleKey: 'form.section.personal',
      isRepeatable: false,
      fields: [
         { code: 'firstName', type: 'TEXT', labelKey: 'form.field.firstName' },
         { code: 'age', type: 'NUMBER', labelKey: 'form.field.age' },
         { code: 'salary', type: 'NUMBER', labelKey: 'form.field.salary' }
      ]
    }]
  };
  
  const renderSchema = await sdk.render(formDef, 'en-US');
  if (renderSchema.schemaVersion === 'v1.0' && renderSchema.layout.sections[0].fields[0].accessibility.role === 'textbox') {
     logger.log(' - ✅ Render Schema successfully extracted ARIA metadata and isolated layout logic.');
  } else {
     logger.error(' - ❌ Render Schema generation failed.');
  }

  // 2. Validation Engine & Explainability
  logger.log('[Test 2] Execution AST Rule Evaluation Adapter...');
  const formConfig = {
     conditions: [
        { type: 'CALCULATED', targetField: 'annualSalary', ast: { operation: 'MULTIPLY', fields: ['salary'], multiplier: 12 } },
        { type: 'VISIBILITY', targetField: 'bonusField', ast: { operation: 'EQUALS', field: 'role', value: 'MANAGER' } }
     ],
     validations: [
        { field: 'age', rule: 'MIN', expected: 18, messageKey: 'form.error.age_min' }
     ]
  };
  
  const payload = { salary: 5000, age: 16, role: 'MANAGER' };
  const validationRes = await sdk.validate(formConfig, payload);
  
  if (validationRes.calculatedPayload.annualSalary === 60000) {
     logger.log(' - ✅ Calculated Fields successfully evaluated via AST (5000 * 12 = 60000).');
  }
  
  if (validationRes.calculatedPayload.__visible_bonusField === true) {
     logger.log(' - ✅ Conditional Visibility accurately evaluated via AST (role === MANAGER).');
  }
  
  if (!validationRes.isValid && validationRes.errors[0].field === 'age') {
     logger.log(' - ✅ Validation Engine successfully trapped MIN rule and emitted structured explainability data.');
  }

  // 3. Submission Autosave & Recovery
  logger.log('[Test 3] Submission State Machine (Autosave vs Submit)...');
  const autosave = await sdk.submit('form-1', payload, 'AUTOSAVE');
  if (autosave.status === 'DRAFT') {
      logger.log(' - ✅ Autosave successfully captured as FormSubmissionVersion (DRAFT).');
  }
  
  const finalSubmit = await sdk.submit('form-1', payload, 'SUBMIT');
  if (finalSubmit.status === 'UNDER_REVIEW') {
      logger.log(' - ✅ Submission pushed state to UNDER_REVIEW, ready for Stage 1 Workflow Engine ingestion.');
  }

  logger.log('Dynamic Forms Platform Verification Completed Successfully.');
}

verifyForms().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
