import { IDatasetProvider } from './dataset-provider.interface';
export declare class MockEmployeeDatasetProvider implements IDatasetProvider {
    code: string;
    getMetadata(): {
        fields: string[];
        securityModel: string;
    };
    execute(query: any, context: any): Promise<any[]>;
}
//# sourceMappingURL=mock-employee.dataset.d.ts.map