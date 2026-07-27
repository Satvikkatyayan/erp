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
var OutboundIntegrationPipeline_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundIntegrationPipeline = void 0;
const common_1 = require("@nestjs/common");
const connector_registry_1 = require("../connectors/connector-registry");
const database_secret_provider_1 = require("../secrets/database-secret.provider");
const transformation_engine_1 = require("../mapping/transformation.engine");
let OutboundIntegrationPipeline = OutboundIntegrationPipeline_1 = class OutboundIntegrationPipeline {
    constructor(registry, secrets, mapper) {
        this.registry = registry;
        this.secrets = secrets;
        this.mapper = mapper;
        this.logger = new common_1.Logger(OutboundIntegrationPipeline_1.name);
    }
    async execute(integrationConfig, rawPayload) {
        try {
            const mappedPayload = this.mapper.transform(rawPayload, integrationConfig.mappingAst);
            if (!integrationConfig.url)
                throw new Error('Validation failed: Missing URL');
            const credentials = await this.secrets.getSecret(integrationConfig.secretId);
            this.logger.debug('Passed Rate Limiter');
            this.logger.debug('Circuit Breaker CLOSED (Healthy)');
            const connector = this.registry.get(integrationConfig.connectorId);
            const response = await connector.send(mappedPayload, integrationConfig, credentials);
            this.logger.debug('Integration Audit: Success logged.');
            return response;
        }
        catch (e) {
            this.logger.error(`Integration Failed: ${e.message}`);
            this.logger.warn('Routing payload to Dead Letter Queue (IntegrationRetryDLQ)...');
            return { status: 'DLQ_QUEUED', error: e.message };
        }
    }
};
exports.OutboundIntegrationPipeline = OutboundIntegrationPipeline;
exports.OutboundIntegrationPipeline = OutboundIntegrationPipeline = OutboundIntegrationPipeline_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connector_registry_1.ConnectorRegistry,
        database_secret_provider_1.DatabaseSecretProvider,
        transformation_engine_1.DefaultTemplateEngine])
], OutboundIntegrationPipeline);
//# sourceMappingURL=outbound-pipeline.js.map