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
var EmployeeDocumentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDocumentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const ess_event_publisher_1 = require("../events/ess-event.publisher");
let EmployeeDocumentService = EmployeeDocumentService_1 = class EmployeeDocumentService {
    constructor(prisma, publisher) {
        this.prisma = prisma;
        this.publisher = publisher;
        this.logger = new common_1.Logger(EmployeeDocumentService_1.name);
    }
    async viewDocument(ctx, documentId, ipAddress, userAgent) {
        await this.prisma.essDocumentAuditLog.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId: ctx.employeeId,
                documentId,
                action: 'VIEWED',
                ipAddress,
                userAgent
            }
        });
        await this.publisher.publishDocumentViewed(ctx, documentId);
        return { success: true };
    }
    async downloadDocument(ctx, documentId, ipAddress, userAgent) {
        await this.prisma.essDocumentAuditLog.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId: ctx.employeeId,
                documentId,
                action: 'DOWNLOADED',
                ipAddress,
                userAgent
            }
        });
        await this.publisher.publishDocumentDownloaded(ctx, documentId);
        return { success: true, downloadUrl: `/api/files/${documentId}/download` };
    }
    async acknowledgePolicy(ctx, documentId, policyName, ipAddress, userAgent) {
        await this.prisma.essAcknowledgement.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId: ctx.employeeId,
                documentId,
                policyName,
                ipAddress,
                userAgent
            }
        });
        await this.publisher.publishPolicyAcknowledged(ctx, documentId, policyName);
        return { success: true };
    }
};
exports.EmployeeDocumentService = EmployeeDocumentService;
exports.EmployeeDocumentService = EmployeeDocumentService = EmployeeDocumentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ess_event_publisher_1.EssEventPublisher])
], EmployeeDocumentService);
//# sourceMappingURL=employee-document.service.js.map