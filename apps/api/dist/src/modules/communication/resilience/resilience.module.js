"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResilienceModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const failure_classifier_service_1 = require("./services/failure-classifier.service");
const retry_policy_service_1 = require("./services/retry-policy.service");
const retry_scheduler_1 = require("./scheduler/retry.scheduler");
const retry_orchestrator_1 = require("./orchestrator/retry.orchestrator");
const delivery_failure_observer_1 = require("./observers/delivery-failure.observer");
let ResilienceModule = class ResilienceModule {
};
exports.ResilienceModule = ResilienceModule;
exports.ResilienceModule = ResilienceModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            {
                provide: 'FailureClassifierInterface',
                useClass: failure_classifier_service_1.FailureClassifierService,
            },
            {
                provide: 'RetryPolicyInterface',
                useClass: retry_policy_service_1.RetryPolicyService,
            },
            retry_scheduler_1.RetryScheduler,
            retry_orchestrator_1.RetryOrchestrator,
            delivery_failure_observer_1.DeliveryFailureObserver,
        ],
    })
], ResilienceModule);
//# sourceMappingURL=resilience.module.js.map