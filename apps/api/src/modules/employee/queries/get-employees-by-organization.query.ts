export class GetEmployeesByOrganizationQuery {
  constructor(
    public readonly tenantId: string,
    public readonly organizationId: string,
    public readonly filters?: any,
    public readonly sort?: any
  ) {}
}
