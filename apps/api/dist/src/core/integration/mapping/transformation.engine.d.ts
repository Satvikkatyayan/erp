export interface ITransformationEngine {
    transform(payload: any, mappingAst: any): any;
}
export declare class DefaultTemplateEngine implements ITransformationEngine {
    private readonly logger;
    transform(payload: any, mappingAst: any): any;
}
//# sourceMappingURL=transformation.engine.d.ts.map