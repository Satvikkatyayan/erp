"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryPolicyService = void 0;
const common_1 = require("@nestjs/common");
let RetryPolicyService = class RetryPolicyService {
    constructor() {
        this.maxAttempts = 3;
        this.baseDelayMs = 1000;
    }
    canRetry(attempts) {
        return attempts < this.maxAttempts;
    }
    computeDelay(attempts) {
        return this.baseDelayMs * Math.pow(2, attempts);
    }
};
exports.RetryPolicyService = RetryPolicyService;
exports.RetryPolicyService = RetryPolicyService = __decorate([
    (0, common_1.Injectable)()
], RetryPolicyService);
//# sourceMappingURL=retry-policy.service.js.map