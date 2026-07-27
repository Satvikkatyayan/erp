import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}

export class CommandResponse<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ required: false })
  data?: T;
}

export class QueryResponse<T = any> {
  @ApiProperty()
  data: T;
}

export class PagedResponse<T = any> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;
}
