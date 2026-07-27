export interface IDatasetProvider {
  code: string;
  getMetadata(): any; // schema, types
  execute(query: any, context: any): Promise<any[]>;
}