export class RenderTemplateQuery {
  constructor(
    public readonly tenantId: string,
    public readonly templateCode: string,
    public readonly payload: Record<string, any>
  ) {}
}
