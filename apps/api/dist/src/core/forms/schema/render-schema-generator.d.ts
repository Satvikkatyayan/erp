import { FieldRegistry } from '../registry/field-registry';
export declare class RenderSchemaGenerator {
    private fieldRegistry;
    constructor(fieldRegistry: FieldRegistry);
    generate(formDefinition: any, locale: string): {
        schemaVersion: string;
        formCode: any;
        layout: {
            type: any;
            sections: any;
        };
    };
}
//# sourceMappingURL=render-schema-generator.d.ts.map