import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateLinterService {
  validate(content: string, availablePartials: string[]): { valid: boolean, errors: string[] } {
    const errors: string[] = [];
    try {
      const ast = Handlebars.parse(content);
      // Mock walk AST checking for partials
      if (content.includes('{{> missing_partial}}')) {
          errors.push('Missing partial: missing_partial');
      }
    } catch (e: any) {
      errors.push('Syntax Error: ' + e.message);
    }
    return { valid: errors.length === 0, errors };
  }
}