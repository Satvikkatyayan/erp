import { Injectable } from '@nestjs/common';
import { GetEmployeesByProjectQuery } from '../get-employees-by-project.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeesByProjectHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeesByProjectQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findEmployeesByProject(query.tenantId, query.projectId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
