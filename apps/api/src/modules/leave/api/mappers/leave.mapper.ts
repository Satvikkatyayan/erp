import { Injectable } from '@nestjs/common';
import { APIResponseDto } from '../dtos/responses.dto';

// Placeholder for RequestContextService which handles correlationId
interface IRequestContextService {
  correlationId: string;
}

@Injectable()
export class LeaveMapper {
  constructor(private readonly contextService: IRequestContextService) {}

  success<T>(data: T, message?: string): APIResponseDto<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: this.contextService.correlationId,
    };
  }

  error(code: string, message: string, details?: any[]): APIResponseDto<null> {
    return {
      success: false,
      error: { code, message, details },
      timestamp: new Date().toISOString(),
      requestId: this.contextService.correlationId,
    };
  }
}
