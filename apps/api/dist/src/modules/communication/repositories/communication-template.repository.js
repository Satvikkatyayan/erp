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
exports.CommunicationTemplateRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let CommunicationTemplateRepository = class CommunicationTemplateRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTemplate(tenantId, templateData, versionData, tx) {
        const db = tx || this.prisma;
        return db.communicationTemplate.create({
            data: {
                tenantId,
                code: templateData.code,
                name: templateData.name,
                description: templateData.description,
                channel: templateData.channel,
                versions: {
                    create: [
                        {
                            tenantId,
                            version: 1,
                            status: 'DRAFT',
                            subject: versionData.subject,
                            body: versionData.body,
                            variables: {
                                create: versionData.variables.map((v) => ({
                                    tenantId,
                                    name: v.name,
                                    type: v.type,
                                    required: v.required !== undefined ? v.required : true,
                                })),
                            },
                        },
                    ],
                },
            },
            include: {
                versions: {
                    include: {
                        variables: true,
                    },
                },
            },
        });
    }
    async publishVersion(tenantId, templateId, versionId, tx) {
        const db = tx || this.prisma;
        return db.communicationTemplateVersion.update({
            where: {
                id: versionId,
                tenantId,
                templateId,
            },
            data: {
                status: 'PUBLISHED',
            },
        });
    }
    async getTemplates(tenantId, tx) {
        const db = tx || this.prisma;
        return db.communicationTemplate.findMany({
            where: { tenantId },
            include: {
                versions: {
                    include: { variables: true },
                },
            },
        });
    }
    async getPublishedTemplateByCode(tenantId, code, tx) {
        const db = tx || this.prisma;
        return db.communicationTemplate.findUnique({
            where: {
                tenantId_code: {
                    tenantId,
                    code,
                },
            },
            include: {
                versions: {
                    where: {
                        status: 'PUBLISHED',
                    },
                    include: {
                        variables: true,
                    },
                },
            },
        });
    }
    async runInTransaction(work) {
        return this.prisma.$transaction(work);
    }
};
exports.CommunicationTemplateRepository = CommunicationTemplateRepository;
exports.CommunicationTemplateRepository = CommunicationTemplateRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunicationTemplateRepository);
//# sourceMappingURL=communication-template.repository.js.map