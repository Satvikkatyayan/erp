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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRegistrationDto = exports.ProviderCapabilityDto = exports.ProviderDescriptorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const channel_enum_1 = require("../../domain/channel.enum");
class ProviderDescriptorDto {
}
exports.ProviderDescriptorDto = ProviderDescriptorDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProviderDescriptorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProviderDescriptorDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProviderDescriptorDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProviderDescriptorDto.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProviderDescriptorDto.prototype, "priority", void 0);
class ProviderCapabilityDto {
}
exports.ProviderCapabilityDto = ProviderCapabilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: channel_enum_1.Channel, isArray: true }),
    __metadata("design:type", Array)
], ProviderCapabilityDto.prototype, "supportedChannels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProviderCapabilityDto.prototype, "supportsHtml", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProviderCapabilityDto.prototype, "supportsAttachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProviderCapabilityDto.prototype, "supportsRichMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProviderCapabilityDto.prototype, "supportsNativeTemplates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProviderCapabilityDto.prototype, "maxPayloadBytes", void 0);
class ProviderRegistrationDto {
}
exports.ProviderRegistrationDto = ProviderRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ProviderDescriptorDto)
], ProviderRegistrationDto.prototype, "descriptor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ProviderCapabilityDto)
], ProviderRegistrationDto.prototype, "capabilities", void 0);
//# sourceMappingURL=provider-responses.dto.js.map