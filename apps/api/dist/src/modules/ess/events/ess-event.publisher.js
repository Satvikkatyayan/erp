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
var EssEventPublisher_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssEventPublisher = void 0;
const common_1 = require("@nestjs/common");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
let EssEventPublisher = EssEventPublisher_1 = class EssEventPublisher {
    constructor(sdk) {
        this.sdk = sdk;
        this.logger = new common_1.Logger(EssEventPublisher_1.name);
    }
    async publishDocumentViewed(ctx, documentId) {
        await this.sdk.events.publish(ctx, 'EssDocumentViewed', { employeeId: ctx.employeeId, documentId });
    }
    async publishDocumentDownloaded(ctx, documentId) {
        await this.sdk.events.publish(ctx, 'EssDocumentDownloaded', { employeeId: ctx.employeeId, documentId });
    }
    async publishPolicyAcknowledged(ctx, documentId, policyName) {
        await this.sdk.events.publish(ctx, 'EssPolicyAcknowledged', { employeeId: ctx.employeeId, documentId, policyName });
    }
};
exports.EssEventPublisher = EssEventPublisher;
exports.EssEventPublisher = EssEventPublisher = EssEventPublisher_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [platform_sdk_1.PlatformSDK])
], EssEventPublisher);
//# sourceMappingURL=ess-event.publisher.js.map