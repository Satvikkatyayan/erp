import { ISecretProvider } from './secret-provider.interface';
export declare class DatabaseSecretProvider implements ISecretProvider {
    private readonly logger;
    getSecret(secretId: string): Promise<string>;
    setSecret(secretId: string, value: string): Promise<void>;
}
//# sourceMappingURL=database-secret.provider.d.ts.map