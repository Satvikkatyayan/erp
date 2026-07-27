import { Injectable, Logger } from '@nestjs/common';

export interface ITransformationEngine {
  transform(payload: any, mappingAst: any): any;
}

@Injectable()
export class DefaultTemplateEngine implements ITransformationEngine {
  private readonly logger = new Logger(DefaultTemplateEngine.name);

  transform(payload: any, mappingAst: any): any {
    this.logger.debug('Executing declarative Mapping DSL...');
    const result: any = {};
    
    for (const key of Object.keys(mappingAst)) {
      const rule = mappingAst[key];
      
      // Field Mapping
      if (rule.sourceField) {
        result[key] = payload[rule.sourceField] ?? rule.defaultValue;
      }
      // String Interpolation
      else if (rule.interpolate) {
        // Very basic mock interpolation "{{firstName}} {{lastName}}"
        let str = rule.interpolate;
        for (const pKey of Object.keys(payload)) {
           str = str.replace(`{{${pKey}}}`, payload[pKey]);
        }
        result[key] = str;
      }
      // Conditional Output
      else if (rule.condition) {
         if (payload[rule.condition.field] === rule.condition.equals) {
             result[key] = rule.condition.then;
         } else {
             result[key] = rule.condition.else;
         }
      }
    }
    return result;
  }
}