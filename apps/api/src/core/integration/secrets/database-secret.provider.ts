import { Injectable, Logger } from '@nestjs/common';
import { ISecretProvider } from './secret-provider.interface';

@Injectable()
export class DatabaseSecretProvider implements ISecretProvider {
  private readonly logger = new Logger(DatabaseSecretProvider.name);

  async getSecret(secretId: string): Promise<string> {
    this.logger.debug(`Retrieving secret [${secretId}] from Database/KMS mock`);
    // Mock decryption logic
    return `decrypted_token_${secretId}`;
  }
  
  async setSecret(secretId: string, value: string): Promise<void> {
    this.logger.debug(`Storing rotated secret [${secretId}] to Database mock`);
  }
}