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
exports.CancelLeaveRequestDto = exports.RejectLeaveRequestDto = exports.ApproveLeaveRequestDto = exports.ApplyLeaveRequestDto = exports.LeaveDateRangeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class LeaveDateRangeDto {
}
exports.LeaveDateRangeDto = LeaveDateRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date of the leave' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LeaveDateRangeDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date of the leave' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LeaveDateRangeDto.prototype, "endDate", void 0);
class ApplyLeaveRequestDto {
}
exports.ApplyLeaveRequestDto = ApplyLeaveRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApplyLeaveRequestDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Leave Type ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApplyLeaveRequestDto.prototype, "leaveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date Range for Leave' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LeaveDateRangeDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", LeaveDateRangeDto)
], ApplyLeaveRequestDto.prototype, "dateRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reason for leave' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApplyLeaveRequestDto.prototype, "reason", void 0);
class ApproveLeaveRequestDto {
}
exports.ApproveLeaveRequestDto = ApproveLeaveRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Manager comments' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApproveLeaveRequestDto.prototype, "comments", void 0);
class RejectLeaveRequestDto {
}
exports.RejectLeaveRequestDto = RejectLeaveRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for rejection' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RejectLeaveRequestDto.prototype, "reason", void 0);
class CancelLeaveRequestDto {
}
exports.CancelLeaveRequestDto = CancelLeaveRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reason for cancellation' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CancelLeaveRequestDto.prototype, "reason", void 0);
//# sourceMappingURL=requests.dto.js.map