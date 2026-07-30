import { Injectable } from '@nestjs/common';
import { GetEmployeeProfileQuery } from '../get-employee-profile.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeeProfileHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeeProfileQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.findEmployeeById(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
