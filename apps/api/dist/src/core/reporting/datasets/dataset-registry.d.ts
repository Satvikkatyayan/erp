import { IDatasetProvider } from './dataset-provider.interface';
export declare class DatasetRegistry {
    private providers;
    register(provider: IDatasetProvider): void;
    get(code: string): IDatasetProvider;
}
//# sourceMappingURL=dataset-registry.d.ts.map