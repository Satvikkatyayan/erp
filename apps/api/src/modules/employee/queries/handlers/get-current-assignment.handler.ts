import { Injectable } from '@nestjs/common';
import { GetCurrentAssignmentQuery } from '../get-current-assignment.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetCurrentAssignmentHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetCurrentAssignmentQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.findEmployeeJobAssignment(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
