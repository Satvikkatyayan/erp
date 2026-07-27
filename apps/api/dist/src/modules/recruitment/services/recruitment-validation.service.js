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
exports.RecruitmentValidationService = void 0;
const common_1 = require("@nestjs/common");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let RecruitmentValidationService = class RecruitmentValidationService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
    }
    async validateNewCandidate(ctx, payload) {
        const ruleResult = await this.sdk.rules.evaluate(ctx, 'CandidateDuplicateCheck', payload);
        if (ruleResult?.isDuplicate) {
            throw new Error('Duplicate candidate detected.');
        }
    }
    async validateHeadcount(ctx, positionId) {
        const position = await this.prisma.recPosition.findUnique({
            where: { id: positionId }
        });
        if (position && position.filled >= position.approvedHeadcount) {
            throw new Error('Position headcount exceeded.');
        }
    }
};
exports.RecruitmentValidationService = RecruitmentValidationService;
exports.RecruitmentValidationService = RecruitmentValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], RecruitmentValidationService);
//# sourceMappingURL=recruitment-validation.service.js.map