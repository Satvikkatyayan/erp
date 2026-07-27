export interface ISearchProvider {
  indexDocument(indexAlias: string, documentId: string, payload: any): Promise<boolean>;
  deleteDocument(indexAlias: string, documentId: string): Promise<boolean>;
  search(indexAlias: string, query: any): Promise<any>;
  createIndex(indexName: string, mappings: any): Promise<boolean>;
  switchAlias(alias: string, targetIndex: string): Promise<boolean>;
}