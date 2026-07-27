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
exports.AttendanceSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AttendanceSnapshotService = class AttendanceSnapshotService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSnapshot(musterId, siteId, projectId, date, prismaTx) {
        const db = prismaTx || this.prisma;
        const existing = await db.musterSnapshot.findFirst({
            where: { siteId, capturedAt: { gte: new Date(date.setHours(0, 0, 0, 0)), lt: new Date(date.setHours(23, 59, 59, 999)) } }
        });
        if (existing) {
            throw new common_1.BadRequestException('Snapshot already exists for this site and date.');
        }
        const assignments = await db.empJobAssignment.findMany({
            where: {
                branchId: siteId,
                effectiveFrom: { lte: date },
                OR: [
                    { effectiveTo: null },
                    { effectiveTo: { gte: date } }
                ]
            },
            include: {
                employee: {
                    include: {
                        reportingAssignments: {
                            where: {
                                effectiveFrom: { lte: date },
                                OR: [
                                    { effectiveTo: null },
                                    { effectiveTo: { gte: date } }
                                ]
                            },
                            take: 1
                        }
                    }
                },
                position: true,
                department: true
            }
        });
        if (assignments.length === 0) {
            throw new common_1.BadRequestException('No employees assigned to this site for the given date.');
        }
        const snapshotData = assignments.map(a => ({
            employeeId: a.employeeId,
            employeeCode: a.employee.employeeCode,
            firstName: a.employee.firstName,
            lastName: a.employee.lastName,
            designationId: a.positionId,
            designationName: a.position?.title || null,
            departmentId: a.departmentId,
            departmentName: a.department?.name || null,
            reportingManagerId: a.employee.reportingAssignments?.[0]?.managerId || null,
        }));
        return db.musterSnapshot.create({
            data: {
                musterId,
                siteId,
                projectId,
                capturedAt: new Date(),
                snapshotData: snapshotData
            }
        });
    }
    async loadSnapshot(snapshotId) {
        const snapshot = await this.prisma.musterSnapshot.findUnique({
            where: { id: snapshotId }
        });
        if (!snapshot)
            throw new common_1.BadRequestException('Snapshot not found');
        return snapshot;
    }
    async validateSnapshot(snapshotId) {
        const snapshot = await this.loadSnapshot(snapshotId);
        if (!snapshot.snapshotData || !Array.isArray(snapshot.snapshotData) || snapshot.snapshotData.length === 0) {
            throw new common_1.BadRequestException('Snapshot is invalid or empty');
        }
        return true;
    }
};
exports.AttendanceSnapshotService = AttendanceSnapshotService;
exports.AttendanceSnapshotService = AttendanceSnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceSnapshotService);
//# sourceMappingURL=attendance-snapshot.service.js.map