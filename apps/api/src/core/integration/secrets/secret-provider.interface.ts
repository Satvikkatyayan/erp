export interface ISecretProvider {
  getSecret(secretId: string): Promise<string>;
  setSecret(secretId: string, value: string): Promise<void>;
}