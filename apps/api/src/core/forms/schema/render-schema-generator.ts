import { Injectable } from '@nestjs/common';
import { FieldRegistry } from '../registry/field-registry';

@Injectable()
export class RenderSchemaGenerator {
  constructor(private fieldRegistry: FieldRegistry) {}

  generate(formDefinition: any, locale: string) {
    // Resolving mock Localization logic here
    const t = (key: string) => key.toUpperCase() + '_LOCALIZED';

    return {
      schemaVersion: 'v1.0',
      formCode: formDefinition.code,
      layout: {
        type: formDefinition.layoutType || 'VERTICAL_GRID',
        sections: formDefinition.sections.map(sec => ({
          code: sec.code,
          title: t(sec.titleKey),
          isRepeatable: sec.isRepeatable,
          fields: sec.fields.map(f => {
             const baseDef = this.fieldRegistry.get(f.type);
             return {
                code: f.code,
                type: f.type,
                label: t(f.labelKey),
                accessibility: baseDef?.accessibility,
                config: { ...baseDef?.defaultConfig, ...f.config }
             };
          })
        }))
      }
    };
  }
}