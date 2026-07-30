"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingPolicyService = void 0;
const common_1 = require("@nestjs/common");
let RoutingPolicyService = class RoutingPolicyService {
    selectProvider(eligibleProviders, context) {
        if (eligibleProviders.length === 0) {
            throw new Error('No eligible providers to select from');
        }
        return [...eligibleProviders].sort((a, b) => {
            if (a.descriptor.priority !== b.descriptor.priority) {
                return b.descriptor.priority - a.descriptor.priority;
            }
            return a.descriptor.name.localeCompare(b.descriptor.name);
        })[0];
    }
};
exports.RoutingPolicyService = RoutingPolicyService;
exports.RoutingPolicyService = RoutingPolicyService = __decorate([
    (0, common_1.Injectable)()
], RoutingPolicyService);
//# sourceMappingURL=routing-policy.service.js.map