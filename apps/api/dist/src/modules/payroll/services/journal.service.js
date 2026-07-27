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
var JournalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let JournalService = JournalService_1 = class JournalService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(JournalService_1.name);
    }
    async exportToErp(ctx, runId, erpProvider) {
        this.logger.log(`Exporting Payroll ${runId} to ERP: ${erpProvider}`);
        return {
            provider: erpProvider,
            totalDebit: 150000,
            totalCredit: 150000,
            status: 'Exported'
        };
    }
};
exports.JournalService = JournalService;
exports.JournalService = JournalService = JournalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JournalService);
//# sourceMappingURL=journal.service.js.map