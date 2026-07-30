export class GetEmployeesByBranchQuery {
  constructor(
    public readonly tenantId: string,
    public readonly branchId: string,
    public readonly filters?: any,
    public readonly sort?: any
  ) {}
}
