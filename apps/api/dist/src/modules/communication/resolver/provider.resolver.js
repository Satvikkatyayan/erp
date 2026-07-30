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
exports.ProviderResolver = void 0;
const common_1 = require("@nestjs/common");
const provider_resolution_exception_1 = require("../exceptions/provider-resolution.exception");
let ProviderResolver = class ProviderResolver {
    constructor(registry) {
        this.registry = registry;
    }
    resolve(channel, requiredCapabilities) {
        const allProviders = this.registry.getAllProviders();
        const eligibleProviders = allProviders.filter(p => {
            if (!p.descriptor.enabled)
                return false;
            if (!p.capabilities.supportedChannels.includes(channel))
                return false;
            if (requiredCapabilities.supportsHtml !== undefined && requiredCapabilities.supportsHtml && !p.capabilities.supportsHtml)
                return false;
            if (requiredCapabilities.supportsAttachments !== undefined && requiredCapabilities.supportsAttachments && !p.capabilities.supportsAttachments)
                return false;
            if (requiredCapabilities.supportsRichMedia !== undefined && requiredCapabilities.supportsRichMedia && !p.capabilities.supportsRichMedia)
                return false;
            if (requiredCapabilities.supportsNativeTemplates !== undefined && requiredCapabilities.supportsNativeTemplates && !p.capabilities.supportsNativeTemplates)
                return false;
            return true;
        });
        if (eligibleProviders.length === 0) {
            throw new provider_resolution_exception_1.ProviderResolutionException(channel, requiredCapabilities);
        }
        eligibleProviders.sort((a, b) => {
            if (a.descriptor.priority !== b.descriptor.priority) {
                return b.descriptor.priority - a.descriptor.priority;
            }
            return a.descriptor.name.localeCompare(b.descriptor.name);
        });
        return eligibleProviders[0];
    }
};
exports.ProviderResolver = ProviderResolver;
exports.ProviderResolver = ProviderResolver = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProviderRegistryInterface')),
    __metadata("design:paramtypes", [Object])
], ProviderResolver);
//# sourceMappingURL=provider.resolver.js.map