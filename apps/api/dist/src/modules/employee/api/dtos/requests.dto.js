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
exports.ConfirmEmployeeRequestDto = exports.RehireEmployeeRequestDto = exports.ExitEmployeeRequestDto = exports.TerminateEmployeeRequestDto = exports.ResignEmployeeRequestDto = exports.PromoteEmployeeRequestDto = exports.TransferEmployeeRequestDto = exports.JoinEmployeeRequestDto = exports.OnboardEmployeeRequestDto = exports.OnboardingDataDto = exports.AssignmentDataDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class AssignmentDataDto {
}
exports.AssignmentDataDto = AssignmentDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Department ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignmentDataDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignmentDataDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Manager ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignmentDataDto.prototype, "managerId", void 0);
class OnboardingDataDto {
}
exports.OnboardingDataDto = OnboardingDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OnboardingDataDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OnboardingDataDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OnboardingDataDto.prototype, "email", void 0);
class OnboardEmployeeRequestDto {
}
exports.OnboardEmployeeRequestDto = OnboardEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data for onboarding', type: () => OnboardingDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OnboardingDataDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", OnboardingDataDto)
], OnboardEmployeeRequestDto.prototype, "data", void 0);
class JoinEmployeeRequestDto {
}
exports.JoinEmployeeRequestDto = JoinEmployeeRequestDto;
class TransferEmployeeRequestDto {
}
exports.TransferEmployeeRequestDto = TransferEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'New assignment data for transfer', type: () => AssignmentDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentDataDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", AssignmentDataDto)
], TransferEmployeeRequestDto.prototype, "newAssignmentData", void 0);
class PromoteEmployeeRequestDto {
}
exports.PromoteEmployeeRequestDto = PromoteEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'New assignment data for promotion', type: () => AssignmentDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentDataDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", AssignmentDataDto)
], PromoteEmployeeRequestDto.prototype, "newAssignmentData", void 0);
class ResignEmployeeRequestDto {
}
exports.ResignEmployeeRequestDto = ResignEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of resignation', example: '2026-08-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResignEmployeeRequestDto.prototype, "resignationDate", void 0);
class TerminateEmployeeRequestDto {
}
exports.TerminateEmployeeRequestDto = TerminateEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of termination', example: '2026-08-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TerminateEmployeeRequestDto.prototype, "terminationDate", void 0);
class ExitEmployeeRequestDto {
}
exports.ExitEmployeeRequestDto = ExitEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Exit date', example: '2026-08-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ExitEmployeeRequestDto.prototype, "exitDate", void 0);
class RehireEmployeeRequestDto {
}
exports.RehireEmployeeRequestDto = RehireEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Initial assignment data for rehiring', type: () => AssignmentDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentDataDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", AssignmentDataDto)
], RehireEmployeeRequestDto.prototype, "initialAssignmentData", void 0);
class ConfirmEmployeeRequestDto {
}
exports.ConfirmEmployeeRequestDto = ConfirmEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user confirming the employee' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConfirmEmployeeRequestDto.prototype, "confirmedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of confirmation', example: '2026-08-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConfirmEmployeeRequestDto.prototype, "confirmedAt", void 0);
//# sourceMappingURL=requests.dto.js.map