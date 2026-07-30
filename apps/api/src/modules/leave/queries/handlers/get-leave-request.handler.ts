import { Injectable } from '@nestjs/common';
import { GetLeaveRequestQuery } from '../get-leave-request.query';
import { QueryResult } from '../../../../core/cqrs/query-result';
import { LeaveQueryService } from '../../services/leave-query.service';

@Injectable()
export class GetLeaveRequestHandler {
  constructor(private readonly queryService: LeaveQueryService) {}

  async execute(query: GetLeaveRequestQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.getLeaveRequest(query.tenantId, query.leaveRequestId);
    return QueryResult.success(data);
  }
}
