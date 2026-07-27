export interface IDatasetProvider {
    code: string;
    getMetadata(): any;
    execute(query: any, context: any): Promise<any[]>;
}
//# sourceMappingURL=dataset-provider.interface.d.ts.map