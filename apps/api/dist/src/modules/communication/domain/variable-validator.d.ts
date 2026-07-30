import { RenderingWarning } from './render-warning';
export interface ValidationResult {
    isValid: boolean;
    validatedPayload: Record<string, any>;
    validationErrors: string[];
    renderingWarnings: RenderingWarning[];
}
export declare class VariableValidator {
    validate(schema: any[], payload: Record<string, any>): ValidationResult;
}
//# sourceMappingURL=variable-validator.d.ts.map