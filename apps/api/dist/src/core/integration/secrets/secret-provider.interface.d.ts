export interface ISecretProvider {
    getSecret(secretId: string): Promise<string>;
    setSecret(secretId: string, value: string): Promise<void>;
}
//# sourceMappingURL=secret-provider.interface.d.ts.map