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
exports.UploadReceiptDto = exports.RemoveExpenseItemDto = exports.AddExpenseItemDto = exports.CancelExpenseDto = exports.SubmitExpenseDto = exports.UpdateExpenseClaimDto = exports.CreateExpenseClaimDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExpenseClaimDto {
}
exports.CreateExpenseClaimDto = CreateExpenseClaimDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseClaimDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseClaimDto.prototype, "departmentId", void 0);
class UpdateExpenseClaimDto {
}
exports.UpdateExpenseClaimDto = UpdateExpenseClaimDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExpenseClaimDto.prototype, "status", void 0);
class SubmitExpenseDto {
}
exports.SubmitExpenseDto = SubmitExpenseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitExpenseDto.prototype, "claimId", void 0);
class CancelExpenseDto {
}
exports.CancelExpenseDto = CancelExpenseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelExpenseDto.prototype, "claimId", void 0);
class AddExpenseItemDto {
}
exports.AddExpenseItemDto = AddExpenseItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddExpenseItemDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddExpenseItemDto.prototype, "category", void 0);
class RemoveExpenseItemDto {
}
exports.RemoveExpenseItemDto = RemoveExpenseItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoveExpenseItemDto.prototype, "itemId", void 0);
class UploadReceiptDto {
}
exports.UploadReceiptDto = UploadReceiptDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadReceiptDto.prototype, "fileUrl", void 0);
//# sourceMappingURL=expense-claim.dto.js.map