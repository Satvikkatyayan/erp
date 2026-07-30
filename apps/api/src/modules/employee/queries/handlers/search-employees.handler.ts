import { Injectable } from '@nestjs/common';
import { SearchEmployeesQuery } from '../search-employees.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class SearchEmployeesHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: SearchEmployeesQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.searchEmployees(query.tenantId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
