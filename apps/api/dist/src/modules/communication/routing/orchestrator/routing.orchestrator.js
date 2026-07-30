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
exports.RoutingOrchestrator = exports.RoutingResult = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
class RoutingResult {
    constructor(routingDecisionId, provider) {
        this.routingDecisionId = routingDecisionId;
        this.provider = provider;
        Object.freeze(this);
    }
}
exports.RoutingResult = RoutingResult;
let RoutingOrchestrator = class RoutingOrchestrator {
    constructor(providerRegistry, eligibilityService, policyService) {
        this.providerRegistry = providerRegistry;
        this.eligibilityService = eligibilityService;
        this.policyService = policyService;
    }
    selectProvider(context, excludedProviderNames = []) {
        const allProviders = this.providerRegistry.getAllProviders();
        const eligibleProviders = allProviders.filter(provider => this.eligibilityService.isEligible(provider, context) &&
            !excludedProviderNames.includes(provider.descriptor.name));
        if (eligibleProviders.length === 0) {
            return null;
        }
        const selectedProvider = this.policyService.selectProvider(eligibleProviders, context);
        const routingDecisionId = (0, crypto_1.randomUUID)();
        return new RoutingResult(routingDecisionId, selectedProvider);
    }
};
exports.RoutingOrchestrator = RoutingOrchestrator;
exports.RoutingOrchestrator = RoutingOrchestrator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProviderRegistryInterface')),
    __param(1, (0, common_1.Inject)('ProviderEligibilityInterface')),
    __param(2, (0, common_1.Inject)('RoutingPolicyInterface')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RoutingOrchestrator);
//# sourceMappingURL=routing.orchestrator.js.map