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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationExecutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const communication_history_repository_1 = require("../repositories/communication-history.repository");
const communication_timeline_repository_1 = require("../repositories/communication-timeline.repository");
const communication_constants_1 = require("../config/communication.constants");
let CommunicationExecutionService = class CommunicationExecutionService {
    constructor(prisma, historyRepo, timelineRepo, provider) {
        this.prisma = prisma;
        this.historyRepo = historyRepo;
        this.timelineRepo = timelineRepo;
        this.provider = provider;
    }
    async dispatchCommunication(command) {
        return this.prisma.$transaction(async (tx) => {
            const history = await this.historyRepo.createHistory(command.tenantId, {
                ...command.payload,
                status: 'PENDING',
            }, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, history.id, 'DISPATCH_REQUESTED', { payload: command.payload }, tx);
            await this.provider.send({
                historyId: history.id,
                ...command.payload,
            });
            return { history, timeline };
        });
    }
};
exports.CommunicationExecutionService = CommunicationExecutionService;
exports.CommunicationExecutionService = CommunicationExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(communication_constants_1.COMMUNICATION_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        communication_history_repository_1.CommunicationHistoryRepository,
        communication_timeline_repository_1.CommunicationTimelineRepository, Object])
], CommunicationExecutionService);
//# sourceMappingURL=communication-execution.service.js.map