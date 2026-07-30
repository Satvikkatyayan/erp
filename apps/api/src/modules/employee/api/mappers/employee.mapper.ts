import { Injectable } from '@nestjs/common';
import { APIResponseDto } from '../dtos/responses.dto';
import { RequestContextService } from '../../../../core/context/request-context.service';

@Injectable()
export class EmployeeMapper {
  constructor(private readonly contextService: RequestContextService) {}

  public success<T>(data: T, message?: string): APIResponseDto<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: this.contextService.correlationId || 'unknown-request-id'
    };
  }

  public error(code: string, message: string, details?: any[]): APIResponseDto<null> {
    return {
      success: false,
      error: {
        code,
        message,
        details
      },
      timestamp: new Date().toISOString(),
      requestId: this.contextService.correlationId || 'unknown-request-id'
    };
  }
}
