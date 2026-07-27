import { Registry } from './registry.interface';
export declare abstract class AbstractRegistry<TItem> implements Registry<TItem> {
    protected items: Map<string, TItem | TItem[]>;
    register(key: string, item: TItem): void;
    get(key: string): TItem | undefined;
    getAllItems(key: string): TItem[];
    getAll(): TItem[];
    remove(key: string): void;
    protected abstract supportsMultipleItemsPerKey(): boolean;
}
//# sourceMappingURL=abstract.registry.d.ts.map