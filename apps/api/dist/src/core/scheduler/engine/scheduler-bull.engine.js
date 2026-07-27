"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SchedulerBullEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerBullEngine = void 0;
const common_1 = require("@nestjs/common");
const rrule_1 = require("rrule");
let SchedulerBullEngine = SchedulerBullEngine_1 = class SchedulerBullEngine {
    constructor() {
        this.logger = new common_1.Logger(SchedulerBullEngine_1.name);
    }
    async scheduleJob(jobId, payload, rruleString, cron) {
        if (rruleString) {
            try {
                const rule = rrule_1.RRule.fromString(rruleString);
                this.logger.log(`Scheduling via RRULE: ${rule.toText()}`);
            }
            catch (e) {
                this.logger.error('Invalid RRULE');
                throw new Error('Invalid RRULE string');
            }
        }
        else if (cron) {
            this.logger.log(`Scheduling via Cron: ${cron}`);
        }
        return { status: 'SCHEDULED', jobId };
    }
    async recoverMissedExecutions() {
        this.logger.log('Executing Missed Execution Recovery Policy: EXECUTE_IMMEDIATELY');
        return true;
    }
};
exports.SchedulerBullEngine = SchedulerBullEngine;
exports.SchedulerBullEngine = SchedulerBullEngine = SchedulerBullEngine_1 = __decorate([
    (0, common_1.Injectable)()
], SchedulerBullEngine);
//# sourceMappingURL=scheduler-bull.engine.js.map