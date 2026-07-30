export class GetEmployeesByProjectQuery {
  constructor(
    public readonly tenantId: string,
    public readonly projectId: string,
    public readonly filters?: any,
    public readonly sort?: any
  ) {}
}
