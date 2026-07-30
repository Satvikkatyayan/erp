import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationHistoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  channel: string;

  @ApiProperty()
  recipient: string;

  @ApiPropertyOptional()
  subject?: string;

  @ApiPropertyOptional()
  body?: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  provider?: string;

  @ApiProperty()
  createdAt: Date;
}
