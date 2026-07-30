import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class APIResponseDto<T> {
  @ApiProperty({ description: 'Indicates if the request was successful' })
  success: boolean;

  @ApiPropertyOptional({ description: 'The payload returned upon success' })
  data?: T;

  @ApiPropertyOptional({ description: 'Optional success message' })
  message?: string;

  @ApiPropertyOptional({ description: 'Error object containing code and details if failure' })
  error?: {
    code: string;
    message: string;
    details?: any[];
  };

  @ApiProperty({ description: 'Timestamp of the response generation' })
  timestamp: string;

  @ApiProperty({ description: 'Traceability ID for debugging' })
  requestId: string;
}
