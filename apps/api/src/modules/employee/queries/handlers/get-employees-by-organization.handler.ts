import { Injectable } from '@nestjs/common';
import { GetEmployeesByOrganizationQuery } from '../get-employees-by-organization.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeesByOrganizationHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeesByOrganizationQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findEmployeesByOrganization(query.tenantId, query.organizationId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
