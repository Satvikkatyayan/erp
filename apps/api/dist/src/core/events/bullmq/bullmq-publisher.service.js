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
exports.BullMQPublisher = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const queues_constant_1 = require("../constants/queues.constant");
let BullMQPublisher = class BullMQPublisher {
    constructor(workflowQueue, notificationQueue, reportQueue, searchQueue, integrationQueue, documentQueue, auditQueue, schedulerQueue) {
        this.workflowQueue = workflowQueue;
        this.notificationQueue = notificationQueue;
        this.reportQueue = reportQueue;
        this.searchQueue = searchQueue;
        this.integrationQueue = integrationQueue;
        this.documentQueue = documentQueue;
        this.auditQueue = auditQueue;
        this.schedulerQueue = schedulerQueue;
    }
    getQueueByName(name) {
        const map = {
            [queues_constant_1.QUEUES.WORKFLOW]: this.workflowQueue,
            [queues_constant_1.QUEUES.NOTIFICATION]: this.notificationQueue,
            [queues_constant_1.QUEUES.REPORT]: this.reportQueue,
            [queues_constant_1.QUEUES.SEARCH]: this.searchQueue,
            [queues_constant_1.QUEUES.INTEGRATION]: this.integrationQueue,
            [queues_constant_1.QUEUES.DOCUMENT]: this.documentQueue,
            [queues_constant_1.QUEUES.AUDIT]: this.auditQueue,
            [queues_constant_1.QUEUES.SCHEDULER]: this.schedulerQueue,
        };
        return map[name];
    }
    async publish(event) {
        const targetQueues = queues_constant_1.EVENT_ROUTING[event.eventName] || [queues_constant_1.QUEUES.AUDIT];
        for (const queueName of targetQueues) {
            const queue = this.getQueueByName(queueName);
            if (queue) {
                await queue.add(event.eventName, event, {
                    jobId: event.eventId,
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 1000,
                    },
                });
            }
        }
    }
    async publishBatch(events) {
        for (const event of events) {
            await this.publish(event);
        }
    }
};
exports.BullMQPublisher = BullMQPublisher;
exports.BullMQPublisher = BullMQPublisher = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.WORKFLOW)),
    __param(1, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.NOTIFICATION)),
    __param(2, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.REPORT)),
    __param(3, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.SEARCH)),
    __param(4, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.INTEGRATION)),
    __param(5, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.DOCUMENT)),
    __param(6, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.AUDIT)),
    __param(7, (0, bullmq_1.InjectQueue)(queues_constant_1.QUEUES.SCHEDULER)),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue,
        bullmq_2.Queue])
], BullMQPublisher);
//# sourceMappingURL=bullmq-publisher.service.js.map