import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../../domain/channel.enum';

export class ProviderDescriptorDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  version: string;
  @ApiProperty()
  enabled: boolean;
  @ApiProperty()
  priority: number;
}

export class ProviderCapabilityDto {
  @ApiProperty({ enum: Channel, isArray: true })
  supportedChannels: Channel[];
  @ApiProperty()
  supportsHtml: boolean;
  @ApiProperty()
  supportsAttachments: boolean;
  @ApiProperty()
  supportsRichMedia: boolean;
  @ApiProperty()
  supportsNativeTemplates: boolean;
  @ApiProperty({ required: false })
  maxPayloadBytes?: number;
}

export class ProviderRegistrationDto {
  @ApiProperty()
  descriptor: ProviderDescriptorDto;
  @ApiProperty()
  capabilities: ProviderCapabilityDto;
}
