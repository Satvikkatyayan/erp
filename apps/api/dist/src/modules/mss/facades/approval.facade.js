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
var ApprovalFacade_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalFacade = void 0;
const common_1 = require("@nestjs/common");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
let ApprovalFacade = ApprovalFacade_1 = class ApprovalFacade {
    constructor(sdk) {
        this.sdk = sdk;
        this.logger = new common_1.Logger(ApprovalFacade_1.name);
    }
    async approve(ctx, workflowId, payload) {
        this.logger.debug(`Approving workflow ${workflowId}`);
        return this.sdk.workflow.trigger(ctx, workflowId);
    }
    async reject(ctx, workflowId, reason) {
        this.logger.debug(`Rejecting workflow ${workflowId}`);
        return this.sdk.workflow.trigger(ctx, workflowId);
    }
};
exports.ApprovalFacade = ApprovalFacade;
exports.ApprovalFacade = ApprovalFacade = ApprovalFacade_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [platform_sdk_1.PlatformSDK])
], ApprovalFacade);
//# sourceMappingURL=approval.facade.js.map