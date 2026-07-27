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
exports.ApprovalMatrixEngine = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
let ApprovalMatrixEngine = class ApprovalMatrixEngine {
    constructor(context) {
        this.context = context;
    }
    generateApprovalChain() {
        const ctx = this.context.getContext();
        return [];
    }
};
exports.ApprovalMatrixEngine = ApprovalMatrixEngine;
exports.ApprovalMatrixEngine = ApprovalMatrixEngine = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext])
], ApprovalMatrixEngine);
//# sourceMappingURL=approval-matrix.engine.js.map