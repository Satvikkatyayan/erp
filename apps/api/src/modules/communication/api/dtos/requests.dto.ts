import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DispatchCommunicationRequestDto {
  @ApiProperty({ description: 'The communication channel (e.g., EMAIL, SMS)' })
  @IsString()
  @IsNotEmpty()
  channel: string;

  @ApiProperty({ description: 'The recipient identifier (email, phone)' })
  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ApiPropertyOptional({ description: 'Subject of the communication if applicable' })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional({ description: 'Body of the communication' })
  @IsString()
  @IsOptional()
  body?: string;

  @ApiPropertyOptional({ description: 'Additional metadata payload' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class GetCommunicationHistoryQueryDto {
  @ApiPropertyOptional({ description: 'Filter by channel' })
  @IsString()
  @IsOptional()
  channel?: string;

  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsString()
  @IsOptional()
  status?: string;
}
