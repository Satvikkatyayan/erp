export class GetEmployeesByDepartmentQuery {
  constructor(
    public readonly tenantId: string,
    public readonly departmentId: string,
    public readonly filters?: any,
    public readonly sort?: any
  ) {}
}
