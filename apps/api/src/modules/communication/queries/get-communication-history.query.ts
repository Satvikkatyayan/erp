export class GetCommunicationHistoryQuery {
  constructor(
    public readonly tenantId: string,
    public readonly params?: {
      channel?: string;
      status?: string;
    }
  ) {}
}
