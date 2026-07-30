export class GetEmployeesByManagerQuery {
  constructor(
    public readonly tenantId: string,
    public readonly managerId: string,
    public readonly filters?: any,
    public readonly sort?: any
  ) {}
}
