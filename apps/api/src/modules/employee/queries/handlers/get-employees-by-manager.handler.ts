import { Injectable } from '@nestjs/common';
import { GetEmployeesByManagerQuery } from '../get-employees-by-manager.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeesByManagerHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeesByManagerQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findEmployeesByManager(query.tenantId, query.managerId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
