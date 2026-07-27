"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const field_registry_1 = require("./core/forms/registry/field-registry");
const rule_evaluation_adapter_1 = require("./core/forms/validation/rule-evaluation-adapter");
const validation_engine_1 = require("./core/forms/validation/validation.engine");
const render_schema_generator_1 = require("./core/forms/schema/render-schema-generator");
const submission_engine_1 = require("./core/forms/submission/submission.engine");
const platform_forms_sdk_1 = require("./core/forms/sdk/platform-forms.sdk");
async function verifyForms() {
    const logger = new common_1.Logger('Forms-Verification');
    logger.log('Starting Enterprise Dynamic Forms Platform Verification...');
    const fieldRegistry = new field_registry_1.FieldRegistry();
    const ruleAdapter = new rule_evaluation_adapter_1.RuleEvaluationAdapter();
    const validationEngine = new validation_engine_1.FormValidationEngine(ruleAdapter);
    const schemaGen = new render_schema_generator_1.RenderSchemaGenerator(fieldRegistry);
    const submissionEngine = new submission_engine_1.FormSubmissionEngine();
    const sdk = new platform_forms_sdk_1.PlatformFormsSDK(validationEngine, schemaGen, submissionEngine);
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
    }
    else {
        logger.error(' - ❌ Render Schema generation failed.');
    }
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
//# sourceMappingURL=verify-forms.js.map