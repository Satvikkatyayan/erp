"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FormSubmissionEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSubmissionEngine = void 0;
const common_1 = require("@nestjs/common");
let FormSubmissionEngine = FormSubmissionEngine_1 = class FormSubmissionEngine {
    constructor() {
        this.logger = new common_1.Logger(FormSubmissionEngine_1.name);
    }
    async processSubmission(formId, payload, action) {
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
};
exports.FormSubmissionEngine = FormSubmissionEngine;
exports.FormSubmissionEngine = FormSubmissionEngine = FormSubmissionEngine_1 = __decorate([
    (0, common_1.Injectable)()
], FormSubmissionEngine);
//# sourceMappingURL=submission.engine.js.map