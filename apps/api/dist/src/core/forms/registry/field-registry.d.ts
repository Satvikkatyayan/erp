export interface FieldDefinition {
    type: string;
    defaultConfig: any;
    accessibility: any;
    serialize: (val: any) => any;
}
export declare class FieldRegistry {
    private fields;
    constructor();
    register(def: FieldDefinition): void;
    get(type: string): FieldDefinition;
}
//# sourceMappingURL=field-registry.d.ts.map