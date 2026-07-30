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
exports.DispatchCommunicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const channel_enum_1 = require("../../domain/channel.enum");
class DispatchCommunicationDto {
}
exports.DispatchCommunicationDto = DispatchCommunicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique identifier for the tenant' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DispatchCommunicationDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The recipient identifier (email, phone number, etc.)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DispatchCommunicationDto.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: channel_enum_1.Channel, description: 'The communication channel to use' }),
    (0, class_validator_1.IsEnum)(channel_enum_1.Channel),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DispatchCommunicationDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique code identifying the template to use' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DispatchCommunicationDto.prototype, "templateCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The payload containing variables for template rendering', required: false }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], DispatchCommunicationDto.prototype, "payload", void 0);
//# sourceMappingURL=dispatch-communication.dto.js.map