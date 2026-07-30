"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingModule = void 0;
const common_1 = require("@nestjs/common");
const provider_eligibility_service_1 = require("./services/provider-eligibility.service");
const routing_policy_service_1 = require("./services/routing-policy.service");
const routing_orchestrator_1 = require("./orchestrator/routing.orchestrator");
const failover_coordinator_1 = require("./coordinator/failover.coordinator");
let RoutingModule = class RoutingModule {
};
exports.RoutingModule = RoutingModule;
exports.RoutingModule = RoutingModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'ProviderEligibilityInterface',
                useClass: provider_eligibility_service_1.ProviderEligibilityService,
            },
            {
                provide: 'RoutingPolicyInterface',
                useClass: routing_policy_service_1.RoutingPolicyService,
            },
            routing_orchestrator_1.RoutingOrchestrator,
            failover_coordinator_1.FailoverCoordinator,
        ],
        exports: [
            routing_orchestrator_1.RoutingOrchestrator,
            failover_coordinator_1.FailoverCoordinator,
        ]
    })
], RoutingModule);
//# sourceMappingURL=routing.module.js.map