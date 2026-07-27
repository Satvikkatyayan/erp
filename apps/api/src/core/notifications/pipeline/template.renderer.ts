import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateRenderer {
  render(templateString: string, variables: any): string {
    // Basic mock handlebar substitution
    return templateString.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const keys = key.split('.');
      let val = variables;
      for (const k of keys) { val = val?.[k]; }
      return val || match;
    });
  }
}