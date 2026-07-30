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
exports.APIResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class APIResponseDto {
}
exports.APIResponseDto = APIResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if the request was successful' }),
    __metadata("design:type", Boolean)
], APIResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'The payload returned upon success' }),
    __metadata("design:type", Object)
], APIResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional success message' }),
    __metadata("design:type", String)
], APIResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Error object containing code and details if failure' }),
    __metadata("design:type", Object)
], APIResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of the response generation' }),
    __metadata("design:type", String)
], APIResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Traceability ID for debugging' }),
    __metadata("design:type", String)
], APIResponseDto.prototype, "requestId", void 0);
//# sourceMappingURL=responses.dto.js.map