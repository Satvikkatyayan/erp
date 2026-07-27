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
exports.PlatformIntegrationSDK = void 0;
const common_1 = require("@nestjs/common");
const outbound_pipeline_1 = require("../pipeline/outbound-pipeline");
const webhook_verifier_1 = require("../webhooks/webhook-verifier");
let PlatformIntegrationSDK = class PlatformIntegrationSDK {
    constructor(outboundPipeline, webhookVerifier) {
        this.outboundPipeline = outboundPipeline;
        this.webhookVerifier = webhookVerifier;
    }
    async send(integrationConfig, rawPayload) {
        return this.outboundPipeline.execute(integrationConfig, rawPayload);
    }
    receiveWebhook(rawPayload, headers, secret) {
        return this.webhookVerifier.verify(rawPayload, headers, secret);
    }
};
exports.PlatformIntegrationSDK = PlatformIntegrationSDK;
exports.PlatformIntegrationSDK = PlatformIntegrationSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [outbound_pipeline_1.OutboundIntegrationPipeline,
        webhook_verifier_1.WebhookVerifier])
], PlatformIntegrationSDK);
//# sourceMappingURL=platform-integration.sdk.js.map