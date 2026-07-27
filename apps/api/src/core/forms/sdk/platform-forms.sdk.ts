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