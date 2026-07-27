export interface Registry<TItem> {
  register(key: string, item: TItem): void;
  get(key: string): TItem | undefined;
  getAll(): TItem[];
  remove(key: string): void;
}
