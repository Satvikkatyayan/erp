import { Registry } from './registry.interface';

export abstract class AbstractRegistry<TItem> implements Registry<TItem> {
  protected items = new Map<string, TItem | TItem[]>();

  register(key: string, item: TItem): void {
    if (this.supportsMultipleItemsPerKey()) {
      if (!this.items.has(key)) {
        this.items.set(key, [] as TItem[]);
      }
      (this.items.get(key) as TItem[]).push(item);
    } else {
      this.items.set(key, item);
    }
  }

  get(key: string): TItem | undefined {
    if (this.supportsMultipleItemsPerKey()) {
      return (this.items.get(key) as TItem[])?.[0]; // Default behavior, should be overridden
    }
    return this.items.get(key) as TItem | undefined;
  }

  getAllItems(key: string): TItem[] {
    if (this.supportsMultipleItemsPerKey()) {
      return (this.items.get(key) as TItem[]) || [];
    }
    const item = this.items.get(key);
    return item ? [item as TItem] : [];
  }

  getAll(): TItem[] {
    const all: TItem[] = [];
    for (const val of this.items.values()) {
      if (Array.isArray(val)) {
        all.push(...val);
      } else {
        all.push(val);
      }
    }
    return all;
  }

  remove(key: string): void {
    this.items.delete(key);
  }

  protected abstract supportsMultipleItemsPerKey(): boolean;
}
