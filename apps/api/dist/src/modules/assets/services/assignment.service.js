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
var AssignmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AssignmentService = AssignmentService_1 = class AssignmentService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AssignmentService_1.name);
    }
    async assignAsset(ctx, assetId, employeeId, assignedBy) {
        this.logger.log(`Assigning asset ${assetId} to employee ${employeeId}`);
        const assignment = await this.prisma.assetAssignment.create({
            data: {
                tenantId: ctx.tenantId,
                assetId,
                employeeId,
                assignedBy,
                status: 'ACTIVE',
            }
        });
        await this.prisma.asset.update({
            where: { id: assetId },
            data: { status: 'ASSIGNED' }
        });
        return assignment;
    }
    async returnAsset(ctx, assignmentId, employeeId, condition, returnedBy) {
        this.logger.log(`Returning assignment ${assignmentId} from employee ${employeeId}`);
        const returnRecord = await this.prisma.assetReturn.create({
            data: {
                tenantId: ctx.tenantId,
                assignmentId,
                assetId: assignmentId,
                employeeId,
                condition,
                returnedBy,
                status: 'COMPLETED'
            }
        });
        const assignment = await this.prisma.assetAssignment.findUnique({ where: { id: assignmentId } });
        if (assignment) {
            await this.prisma.assetAssignment.update({
                where: { id: assignmentId },
                data: { status: 'RETURNED', returnedAt: new Date(), returnCondition: condition }
            });
            await this.prisma.asset.update({
                where: { id: assignment.assetId },
                data: { status: 'AVAILABLE', condition: condition }
            });
        }
        return returnRecord;
    }
};
exports.AssignmentService = AssignmentService;
exports.AssignmentService = AssignmentService = AssignmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentService);
//# sourceMappingURL=assignment.service.js.map