"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationModule = void 0;
const common_1 = require("@nestjs/common");
const database_secret_provider_1 = require("./secrets/database-secret.provider");
const connector_registry_1 = require("./connectors/connector-registry");
const rest_connector_1 = require("./connectors/rest.connector");
const transformation_engine_1 = require("./mapping/transformation.engine");
const outbound_pipeline_1 = require("./pipeline/outbound-pipeline");
const webhook_verifier_1 = require("./webhooks/webhook-verifier");
const platform_integration_sdk_1 = require("./sdk/platform-integration.sdk");
let IntegrationModule = class IntegrationModule {
};
exports.IntegrationModule = IntegrationModule;
exports.IntegrationModule = IntegrationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            database_secret_provider_1.DatabaseSecretProvider,
            connector_registry_1.ConnectorRegistry,
            rest_connector_1.RESTConnector,
            transformation_engine_1.DefaultTemplateEngine,
            outbound_pipeline_1.OutboundIntegrationPipeline,
            webhook_verifier_1.WebhookVerifier,
            platform_integration_sdk_1.PlatformIntegrationSDK
        ],
        exports: [platform_integration_sdk_1.PlatformIntegrationSDK]
    })
], IntegrationModule);
//# sourceMappingURL=integration.module.js.map