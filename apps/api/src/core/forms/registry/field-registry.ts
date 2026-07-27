import { Injectable } from '@nestjs/common';

export interface FieldDefinition {
  type: string;
  defaultConfig: any;
  accessibility: any;
  serialize: (val: any) => any;
}

@Injectable()
export class FieldRegistry {
  private fields = new Map<string, FieldDefinition>();

  constructor() {
    this.register({
      type: 'TEXT',
      defaultConfig: { maxLength: 255 },
      accessibility: { role: 'textbox', ariaRequired: false },
      serialize: (val) => String(val || '')
    });
    this.register({
      type: 'NUMBER',
      defaultConfig: { min: 0 },
      accessibility: { role: 'spinbutton', ariaRequired: false },
      serialize: (val) => Number(val || 0)
    });
    this.register({
      type: 'REPEATABLE_GROUP',
      defaultConfig: { minItems: 0, maxItems: 10 },
      accessibility: { role: 'group' },
      serialize: (val) => Array.isArray(val) ? val : []
    });
  }
  
  register(def: FieldDefinition) { this.fields.set(def.type, def); }
  get(type: string) { return this.fields.get(type); }
}