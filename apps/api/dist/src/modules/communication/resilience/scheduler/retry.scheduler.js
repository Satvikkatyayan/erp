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
exports.RetryScheduler = void 0;
const common_1 = require("@nestjs/common");
const retry_orchestrator_1 = require("../orchestrator/retry.orchestrator");
let RetryScheduler = class RetryScheduler {
    constructor(orchestrator) {
        this.orchestrator = orchestrator;
    }
    async scheduleRetry(correlationId, tenantId, channel, delayMs) {
        const attemptId = `retry-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        setTimeout(() => {
            this.orchestrator.executeRetry(correlationId, tenantId, channel, attemptId)
                .catch(err => {
                console.error(`Isolated orchestrator failure for ${correlationId}`, err);
            });
        }, delayMs);
    }
};
exports.RetryScheduler = RetryScheduler;
exports.RetryScheduler = RetryScheduler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [retry_orchestrator_1.RetryOrchestrator])
], RetryScheduler);
//# sourceMappingURL=retry.scheduler.js.map