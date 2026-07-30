"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalDecisionService = void 0;
const common_1 = require("@nestjs/common");
const approval_decision_interface_1 = require("../contracts/approval-decision.interface");
let ApprovalDecisionService = class ApprovalDecisionService {
    evaluate(command) {
        if (command.payload && command.payload.requiresApproval) {
            return new approval_decision_interface_1.ApprovalDecisionResult(true, ['admin-id-1']);
        }
        return new approval_decision_interface_1.ApprovalDecisionResult(false);
    }
};
exports.ApprovalDecisionService = ApprovalDecisionService;
exports.ApprovalDecisionService = ApprovalDecisionService = __decorate([
    (0, common_1.Injectable)()
], ApprovalDecisionService);
//# sourceMappingURL=approval-decision.service.js.map