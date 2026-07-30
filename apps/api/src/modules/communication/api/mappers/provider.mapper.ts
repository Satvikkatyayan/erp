import { Injectable } from '@nestjs/common';
import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { ProviderRegistrationDto } from '../dtos/provider-responses.dto';

@Injectable()
export class ProviderMapper {
  mapToResponseDto(registrations: ProviderRegistration[]): ProviderRegistrationDto[] {
    return registrations.map(reg => ({
      descriptor: {
        name: reg.descriptor.name,
        type: reg.descriptor.type,
        version: reg.descriptor.version,
        enabled: reg.descriptor.enabled,
        priority: reg.descriptor.priority,
      },
      capabilities: {
        supportedChannels: reg.capabilities.supportedChannels,
        supportsHtml: reg.capabilities.supportsHtml,
        supportsAttachments: reg.capabilities.supportsAttachments,
        supportsRichMedia: reg.capabilities.supportsRichMedia,
        supportsNativeTemplates: reg.capabilities.supportsNativeTemplates,
        maxPayloadBytes: reg.capabilities.maxPayloadBytes,
      }
    }));
  }

  success<T>(data: T, message: string = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }
}
