import { RenderingWarning } from './render-warning';

export interface ValidationResult {
  isValid: boolean;
  validatedPayload: Record<string, any>;
  validationErrors: string[];
  renderingWarnings: RenderingWarning[];
}

export class VariableValidator {
  public validate(schema: any[], payload: Record<string, any>): ValidationResult {
    const validatedPayload: Record<string, any> = {};
    const validationErrors: string[] = [];
    const renderingWarnings: RenderingWarning[] = [];
    const providedKeys = Object.keys(payload || {});

    // Check required variables from schema
    if (schema && Array.isArray(schema)) {
      for (const variable of schema) {
        if (variable.required && (payload[variable.name] === undefined || payload[variable.name] === null)) {
          validationErrors.push(variable.name);
        } else if (payload[variable.name] !== undefined && payload[variable.name] !== null) {
          validatedPayload[variable.name] = payload[variable.name];
        }
      }
    }

    // Check for extraneous variables
    const schemaKeys = schema ? schema.map((v) => v.name) : [];
    for (const key of providedKeys) {
      if (!schemaKeys.includes(key)) {
        renderingWarnings.push({
          type: 'UNEXPECTED_VARIABLE',
          variableName: key,
          message: `Variable '${key}' was provided but is not defined in the template schema. It has been ignored.`,
        });
      }
    }

    return {
      isValid: validationErrors.length === 0,
      validatedPayload,
      validationErrors,
      renderingWarnings,
    };
  }
}
