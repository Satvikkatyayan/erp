export class SearchEmployeesQuery {
  constructor(
    public readonly tenantId: string,
    public readonly filters?: any,
    public readonly sort?: any
  ) {}
}
