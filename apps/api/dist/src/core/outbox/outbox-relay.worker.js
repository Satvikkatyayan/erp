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
var OutboxRelayWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxRelayWorker = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const event_bus_service_1 = require("../events/event-bus.service");
const uuid_1 = require("uuid");
let OutboxRelayWorker = OutboxRelayWorker_1 = class OutboxRelayWorker {
    constructor(prisma, eventBus) {
        this.prisma = prisma;
        this.eventBus = eventBus;
        this.logger = new common_1.Logger(OutboxRelayWorker_1.name);
        this.isProcessing = false;
    }
    async handleRelay() {
        if (this.isProcessing)
            return;
        this.isProcessing = true;
        try {
            const messages = await this.prisma.outboxMessage.findMany({
                where: {
                    state: 'PENDING',
                },
                take: 100,
            });
            if (messages.length === 0) {
                this.isProcessing = false;
                return;
            }
            this.logger.log(`Relaying ${messages.length} messages from outbox...`);
            for (const msg of messages) {
                await this.prisma.$transaction(async (tx) => {
                    const locked = await tx.outboxMessage.updateMany({
                        where: { id: msg.id, state: 'PENDING' },
                        data: { state: 'PROCESSING', lockedBy: 'relay-worker', lockedAt: new Date() }
                    });
                    if (locked.count > 0) {
                        try {
                            const event = {
                                eventId: msg.id,
                                eventName: msg.eventName,
                                payload: msg.payload,
                                timestamp: new Date(),
                                correlationId: msg.correlationId || (0, uuid_1.v4)(),
                                causationId: msg.causationId,
                                version: 1,
                            };
                            await this.eventBus.publish(event);
                            await tx.outboxMessage.update({
                                where: { id: msg.id },
                                data: { state: 'PROCESSED' }
                            });
                        }
                        catch (error) {
                            const newRetryCount = msg.retryCount + 1;
                            const maxRetries = 5;
                            const nextRetry = new Date(Date.now() + Math.pow(2, newRetryCount) * 1000);
                            await tx.outboxMessage.update({
                                where: { id: msg.id },
                                data: {
                                    state: newRetryCount >= maxRetries ? 'DEAD_LETTER' : 'PENDING',
                                    retryCount: newRetryCount,
                                    nextRetryAt: nextRetry,
                                    error: error.message,
                                }
                            });
                        }
                    }
                });
            }
        }
        catch (e) {
            this.logger.error('Failed to relay outbox messages', e.stack);
        }
        finally {
            this.isProcessing = false;
        }
    }
};
exports.OutboxRelayWorker = OutboxRelayWorker;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutboxRelayWorker.prototype, "handleRelay", null);
exports.OutboxRelayWorker = OutboxRelayWorker = OutboxRelayWorker_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_bus_service_1.EventBusService])
], OutboxRelayWorker);
//# sourceMappingURL=outbox-relay.worker.js.map