"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderMapper = void 0;
const common_1 = require("@nestjs/common");
let ProviderMapper = class ProviderMapper {
    mapToResponseDto(registrations) {
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
    success(data, message = 'Success') {
        return {
            success: true,
            message,
            data,
        };
    }
};
exports.ProviderMapper = ProviderMapper;
exports.ProviderMapper = ProviderMapper = __decorate([
    (0, common_1.Injectable)()
], ProviderMapper);
//# sourceMappingURL=provider.mapper.js.map