export class CreateTemplateCommand {
  constructor(
    public readonly tenantId: string,
    public readonly payload: {
      code: string;
      name: string;
      description?: string;
      channel: string;
      subject?: string;
      body: string;
      variables: {
        name: string;
        type: string;
        required?: boolean;
      }[];
    }
  ) {}
}
