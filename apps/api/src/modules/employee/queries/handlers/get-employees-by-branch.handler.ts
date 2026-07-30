import { Injectable } from '@nestjs/common';
import { GetEmployeesByBranchQuery } from '../get-employees-by-branch.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeesByBranchHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeesByBranchQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findEmployeesByBranch(query.tenantId, query.branchId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
