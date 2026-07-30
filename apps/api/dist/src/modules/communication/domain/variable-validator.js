"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableValidator = void 0;
class VariableValidator {
    validate(schema, payload) {
        const validatedPayload = {};
        const validationErrors = [];
        const renderingWarnings = [];
        const providedKeys = Object.keys(payload || {});
        if (schema && Array.isArray(schema)) {
            for (const variable of schema) {
                if (variable.required && (payload[variable.name] === undefined || payload[variable.name] === null)) {
                    validationErrors.push(variable.name);
                }
                else if (payload[variable.name] !== undefined && payload[variable.name] !== null) {
                    validatedPayload[variable.name] = payload[variable.name];
                }
            }
        }
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
exports.VariableValidator = VariableValidator;
//# sourceMappingURL=variable-validator.js.map