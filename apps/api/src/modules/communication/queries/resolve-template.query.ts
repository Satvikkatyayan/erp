export class ResolveTemplateQuery {
  constructor(
    public readonly tenantId: string,
    public readonly code: string
  ) {}
}
