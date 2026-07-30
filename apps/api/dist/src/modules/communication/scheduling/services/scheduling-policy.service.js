"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingPolicyService = void 0;
const common_1 = require("@nestjs/common");
let SchedulingPolicyService = class SchedulingPolicyService {
    determineReleaseTime(command) {
        const executeAt = command.payload?.executeAt;
        if (executeAt && typeof executeAt === 'string') {
            return new Date(executeAt);
        }
        return new Date();
    }
};
exports.SchedulingPolicyService = SchedulingPolicyService;
exports.SchedulingPolicyService = SchedulingPolicyService = __decorate([
    (0, common_1.Injectable)()
], SchedulingPolicyService);
//# sourceMappingURL=scheduling-policy.service.js.map