export class RenderError extends Error {
  public readonly missingVariables: string[];

  constructor(missingVariables: string[]) {
    super(`Template rendering failed. Missing required variables: ${missingVariables.join(', ')}`);
    this.name = 'RenderError';
    this.missingVariables = missingVariables;
  }
}
