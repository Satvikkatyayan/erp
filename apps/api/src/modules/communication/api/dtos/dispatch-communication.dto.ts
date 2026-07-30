import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsObject, IsOptional } from 'class-validator';
import { Channel } from '../../domain/channel.enum';

export class DispatchCommunicationDto {
  @ApiProperty({ description: 'The unique identifier for the tenant' })
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ description: 'The recipient identifier (email, phone number, etc.)' })
  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ApiProperty({ enum: Channel, description: 'The communication channel to use' })
  @IsEnum(Channel)
  @IsNotEmpty()
  channel: Channel;

  @ApiProperty({ description: 'The unique code identifying the template to use' })
  @IsString()
  @IsNotEmpty()
  templateCode: string;

  @ApiProperty({ description: 'The payload containing variables for template rendering', required: false })
  @IsObject()
  @IsOptional()
  payload?: Record<string, any>;
}
