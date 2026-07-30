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
exports.EmpEmployeeSnapshotRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const uuid_1 = require("uuid");
let EmpEmployeeSnapshotRepository = class EmpEmployeeSnapshotRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSnapshot(tenantId, employeeId, snapshotData, tx) {
        const client = tx || this.prisma;
        return client.empEmployeeSnapshot.create({
            data: {
                id: (0, uuid_1.v4)(),
                employeeId,
                payload: snapshotData,
                generatedAt: new Date(),
            }
        });
    }
    async getLatestSnapshot(tenantId, employeeId) {
        return this.prisma.empEmployeeSnapshot.findFirst({
            where: { employeeId },
            orderBy: { generatedAt: 'desc' }
        });
    }
};
exports.EmpEmployeeSnapshotRepository = EmpEmployeeSnapshotRepository;
exports.EmpEmployeeSnapshotRepository = EmpEmployeeSnapshotRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmpEmployeeSnapshotRepository);
//# sourceMappingURL=snapshot.repository.js.map