"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformFormsSDK = void 0;
const common_1 = require("@nestjs/common");
const validation_engine_1 = require("../validation/validation.engine");
const render_schema_generator_1 = require("../schema/render-schema-generator");
const submission_engine_1 = require("../submission/submission.engine");
let PlatformFormsSDK = class PlatformFormsSDK {
    constructor(validation, schemaGen, submission) {
        this.validation = validation;
        this.schemaGen = schemaGen;
        this.submission = submission;
    }
    async render(formDefinition, locale = 'en-US') {
        return this.schemaGen.generate(formDefinition, locale);
    }
    async validate(formConfig, payload) {
        return this.validation.validate(formConfig, payload);
    }
    async submit(formId, payload, action = 'SUBMIT') {
        return this.submission.processSubmission(formId, payload, action);
    }
};
exports.PlatformFormsSDK = PlatformFormsSDK;
exports.PlatformFormsSDK = PlatformFormsSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validation_engine_1.FormValidationEngine,
        render_schema_generator_1.RenderSchemaGenerator,
        submission_engine_1.FormSubmissionEngine])
], PlatformFormsSDK);
//# sourceMappingURL=platform-forms.sdk.js.map