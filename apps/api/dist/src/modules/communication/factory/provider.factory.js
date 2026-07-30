"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderFactory = void 0;
const common_1 = require("@nestjs/common");
const smtp_provider_1 = require("../providers/smtp.provider");
const ses_provider_1 = require("../providers/ses.provider");
const twilio_provider_1 = require("../providers/twilio.provider");
const channel_enum_1 = require("../domain/channel.enum");
let ProviderFactory = class ProviderFactory {
    constructor(registry, smtpProvider, sesProvider, twilioProvider) {
        this.registry = registry;
        this.smtpProvider = smtpProvider;
        this.sesProvider = sesProvider;
        this.twilioProvider = twilioProvider;
    }
    onModuleInit() {
        this.initializeProviders();
    }
    initializeProviders() {
        this.registry.register({
            provider: this.smtpProvider,
            descriptor: {
                name: 'smtp-provider',
                type: 'email',
                version: '1.0.0',
                enabled: true,
                priority: 1
            },
            capabilities: {
                supportedChannels: [channel_enum_1.Channel.EMAIL],
                supportsHtml: true,
                supportsAttachments: true,
                supportsRichMedia: false,
                supportsNativeTemplates: false
            }
        });
        this.registry.register({
            provider: this.sesProvider,
            descriptor: {
                name: 'ses-provider',
                type: 'email',
                version: '1.0.0',
                enabled: true,
                priority: 2
            },
            capabilities: {
                supportedChannels: [channel_enum_1.Channel.EMAIL],
                supportsHtml: true,
                supportsAttachments: true,
                supportsRichMedia: false,
                supportsNativeTemplates: false
            }
        });
        this.registry.register({
            provider: this.twilioProvider,
            descriptor: {
                name: 'twilio-provider',
                type: 'sms',
                version: '1.0.0',
                enabled: true,
                priority: 1
            },
            capabilities: {
                supportedChannels: [channel_enum_1.Channel.SMS],
                supportsHtml: false,
                supportsAttachments: false,
                supportsRichMedia: false,
                supportsNativeTemplates: false
            }
        });
    }
};
exports.ProviderFactory = ProviderFactory;
exports.ProviderFactory = ProviderFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProviderRegistryInterface')),
    __metadata("design:paramtypes", [Object, smtp_provider_1.SmtpProvider,
        ses_provider_1.SesProvider,
        twilio_provider_1.TwilioProvider])
], ProviderFactory);
//# sourceMappingURL=provider.factory.js.map