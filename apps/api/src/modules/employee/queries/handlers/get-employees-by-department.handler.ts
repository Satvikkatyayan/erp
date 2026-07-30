import { Injectable } from '@nestjs/common';
import { GetEmployeesByDepartmentQuery } from '../get-employees-by-department.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeesByDepartmentHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeesByDepartmentQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findEmployeesByDepartment(query.tenantId, query.departmentId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
