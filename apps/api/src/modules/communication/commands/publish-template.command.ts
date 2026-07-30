export class PublishTemplateCommand {
  constructor(
    public readonly tenantId: string,
    public readonly templateId: string,
    public readonly versionId: string
  ) {}
}
