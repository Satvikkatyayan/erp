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
var EmployeeSessionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSessionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let EmployeeSessionService = EmployeeSessionService_1 = class EmployeeSessionService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(EmployeeSessionService_1.name);
    }
    async registerDevice(ctx, deviceId, deviceName) {
        return this.prisma.essDeviceRegistration.upsert({
            where: { deviceId },
            create: {
                tenantId: ctx.tenantId,
                employeeId: ctx.employeeId,
                deviceId,
                deviceName,
                isTrusted: false
            },
            update: {
                deviceName,
                lastUsedAt: new Date()
            }
        });
    }
    async createSession(ctx, tokenJti, deviceId, ipAddress, userAgent, expiresAt) {
        return this.prisma.essSession.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId: ctx.employeeId,
                tokenJti,
                deviceId,
                ipAddress,
                userAgent,
                expiresAt
            }
        });
    }
    async getActiveSessions(ctx) {
        return this.prisma.essSession.findMany({
            where: { employeeId: ctx.employeeId, expiresAt: { gt: new Date() } }
        });
    }
};
exports.EmployeeSessionService = EmployeeSessionService;
exports.EmployeeSessionService = EmployeeSessionService = EmployeeSessionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeSessionService);
//# sourceMappingURL=employee-session.service.js.map