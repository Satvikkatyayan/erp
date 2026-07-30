import { Injectable } from '@nestjs/common';
import { GetLeaveBalancesQuery } from '../get-leave-balances.query';
import { QueryResult } from '../../../../core/cqrs/query-result';
import { LeaveQueryService } from '../../services/leave-query.service';

@Injectable()
export class GetLeaveBalancesHandler {
  constructor(private readonly queryService: LeaveQueryService) {}

  async execute(query: GetLeaveBalancesQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.getLeaveBalances(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
