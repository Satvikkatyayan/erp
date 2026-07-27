export interface ITemplateRenderer {
  render(content: string, profile: any): Promise<Buffer | string>;
}