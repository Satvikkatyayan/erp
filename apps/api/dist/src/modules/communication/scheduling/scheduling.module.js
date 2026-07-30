"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const scheduling_eligibility_service_1 = require("./services/scheduling-eligibility.service");
const scheduling_policy_service_1 = require("./services/scheduling-policy.service");
const scheduling_orchestrator_1 = require("./orchestrator/scheduling.orchestrator");
const schedule_release_coordinator_1 = require("./coordinator/schedule-release.coordinator");
let SchedulingModule = class SchedulingModule {
};
exports.SchedulingModule = SchedulingModule;
exports.SchedulingModule = SchedulingModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            {
                provide: 'SchedulingEligibilityInterface',
                useClass: scheduling_eligibility_service_1.SchedulingEligibilityService,
            },
            {
                provide: 'SchedulingPolicyInterface',
                useClass: scheduling_policy_service_1.SchedulingPolicyService,
            },
            scheduling_orchestrator_1.SchedulingOrchestrator,
            schedule_release_coordinator_1.ScheduleReleaseCoordinator,
        ],
        exports: [
            scheduling_orchestrator_1.SchedulingOrchestrator,
            schedule_release_coordinator_1.ScheduleReleaseCoordinator,
        ]
    })
], SchedulingModule);
//# sourceMappingURL=scheduling.module.js.map