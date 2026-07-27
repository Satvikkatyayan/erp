import { Injectable, Logger } from '@nestjs/common';
import { ISearchProvider } from './search-provider.interface';

@Injectable()
export class PostgresFullTextProvider implements ISearchProvider {
  private readonly logger = new Logger(PostgresFullTextProvider.name);

  async indexDocument(indexAlias: string, documentId: string, payload: any): Promise<boolean> {
    this.logger.debug(`[PostgresFTS] Indexing ${documentId} into ${indexAlias}`);
    // In reality this would upsert SearchDocument and cast tsvector.
    return true;
  }
  
  async deleteDocument(indexAlias: string, documentId: string): Promise<boolean> {
    return true;
  }

  async search(indexAlias: string, query: any): Promise<any> {
    this.logger.debug(`[PostgresFTS] Querying ${indexAlias} with FTS ${query.text}`);
    // Mock FTS match
    return {
      hits: [
        {
          id: 'doc1',
          score: 0.95,
          highlight: { name: ['John **Manager** Smith'] },
          source: { department: 'Human Resources', name: 'John Manager Smith' }
        }
      ],
      aggregations: {
        department: { 'Human Resources': 1 }
      }
    };
  }
  
  async createIndex(indexName: string, mappings: any): Promise<boolean> {
    this.logger.debug(`[PostgresFTS] Created physical index ${indexName}`);
    return true;
  }
  
  async switchAlias(alias: string, targetIndex: string): Promise<boolean> {
    this.logger.debug(`[PostgresFTS] Switched alias ${alias} -> ${targetIndex}`);
    return true;
  }
}