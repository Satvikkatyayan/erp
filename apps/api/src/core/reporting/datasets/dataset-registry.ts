import { Injectable, Logger } from '@nestjs/common';
import { IDatasetProvider } from './dataset-provider.interface';

@Injectable()
export class DatasetRegistry {
  private providers = new Map<string, IDatasetProvider>();
  
  register(provider: IDatasetProvider) {
    this.providers.set(provider.code, provider);
  }
  
  get(code: string): IDatasetProvider {
    return this.providers.get(code);
  }
}