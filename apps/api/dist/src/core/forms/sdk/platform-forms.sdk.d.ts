import { FormValidationEngine } from '../validation/validation.engine';
import { RenderSchemaGenerator } from '../schema/render-schema-generator';
import { FormSubmissionEngine } from '../submission/submission.engine';
export declare class PlatformFormsSDK {
    private validation;
    private schemaGen;
    private submission;
    constructor(validation: FormValidationEngine, schemaGen: RenderSchemaGenerator, submission: FormSubmissionEngine);
    render(formDefinition: any, locale?: string): Promise<{
        schemaVersion: string;
        formCode: any;
        layout: {
            type: any;
            sections: any;
        };
    }>;
    validate(formConfig: any, payload: any): Promise<{
        isValid: boolean;
        errors: any[];
        calculatedPayload: any;
    }>;
    submit(formId: string, payload: any, action?: 'AUTOSAVE' | 'SUBMIT'): Promise<{
        status: string;
        submissionId: string;
        version: number;
    } | {
        status: string;
        submissionId: string;
        version?: undefined;
    }>;
}
//# sourceMappingURL=platform-forms.sdk.d.ts.map