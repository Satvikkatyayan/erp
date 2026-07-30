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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const delivery_result_1 = require("../domain/delivery-result");
const delivery_context_1 = require("../domain/delivery-context");
const delivery_lifecycle_enum_1 = require("../domain/delivery-lifecycle.enum");
const template_rendering_service_1 = require("./template-rendering.service");
const routing_orchestrator_1 = require("../routing/orchestrator/routing.orchestrator");
const routing_decision_made_event_1 = require("../events/routing-decision-made.event");
const routing_exhausted_event_1 = require("../events/routing-exhausted.event");
const render_template_query_1 = require("../queries/render-template.query");
const provider_resolution_exception_1 = require("../exceptions/provider-resolution.exception");
const render_exceptions_1 = require("../exceptions/render.exceptions");
const delivery_orchestration_exception_1 = require("../exceptions/delivery-orchestration.exception");
const crypto_1 = require("crypto");
const cqrs_1 = require("@nestjs/cqrs");
const delivery_dispatched_event_1 = require("../events/delivery-dispatched.event");
const delivery_completed_event_1 = require("../events/delivery-completed.event");
const delivery_failed_event_1 = require("../events/delivery-failed.event");
let DeliveryService = class DeliveryService {
    constructor(templateRenderingService, routingOrchestrator, eventBus) {
        this.templateRenderingService = templateRenderingService;
        this.routingOrchestrator = routingOrchestrator;
        this.eventBus = eventBus;
    }
    async executeDelivery(command) {
        const correlationId = (0, crypto_1.randomUUID)();
        const context = new delivery_context_1.DeliveryContext(command.tenantId, command.recipient, command.channel, command.templateCode, command.payload || {}, correlationId);
        if (!context.tenantId || !context.recipient || !context.channel || !context.templateCode) {
            return new delivery_result_1.DeliveryResult(false, delivery_lifecycle_enum_1.DeliveryLifecycle.RECEIVED, correlationId, {
                code: 'VALIDATION_FAILED',
                message: 'Missing required context fields (tenantId, recipient, channel, templateCode)',
            });
        }
        let currentStage = delivery_lifecycle_enum_1.DeliveryLifecycle.VALIDATED;
        this.eventBus.publish(new delivery_dispatched_event_1.DeliveryDispatchedEvent(correlationId, context.tenantId, context.channel, context.templateCode));
        try {
            const renderQuery = new render_template_query_1.RenderTemplateQuery(context.tenantId, context.templateCode, context.payload);
            const renderResult = await this.templateRenderingService.renderTemplate(renderQuery);
            currentStage = delivery_lifecycle_enum_1.DeliveryLifecycle.RENDERED;
            const routingResult = this.routingOrchestrator.selectProvider(context);
            if (!routingResult) {
                this.eventBus.publish(new routing_exhausted_event_1.RoutingExhaustedEvent(correlationId, context.tenantId, context.channel));
                throw new provider_resolution_exception_1.ProviderResolutionException(context.channel, {});
            }
            this.eventBus.publish(new routing_decision_made_event_1.RoutingDecisionMadeEvent(correlationId, routingResult.routingDecisionId, routingResult.provider.descriptor.name, context.tenantId));
            currentStage = delivery_lifecycle_enum_1.DeliveryLifecycle.PROVIDER_RESOLVED;
            await routingResult.provider.provider.send(renderResult);
            currentStage = delivery_lifecycle_enum_1.DeliveryLifecycle.PROVIDER_INVOKED;
            this.eventBus.publish(new delivery_completed_event_1.DeliveryCompletedEvent(correlationId, context.tenantId, context.channel, routingResult.provider.descriptor.name));
            return new delivery_result_1.DeliveryResult(true, delivery_lifecycle_enum_1.DeliveryLifecycle.COMPLETED, correlationId);
        }
        catch (error) {
            let errorCode = 'UNKNOWN_ERROR';
            if (error instanceof render_exceptions_1.RenderError) {
                errorCode = 'RENDER_ERROR';
            }
            else if (error instanceof provider_resolution_exception_1.ProviderResolutionException) {
                errorCode = 'PROVIDER_RESOLUTION_ERROR';
            }
            else if (error instanceof delivery_orchestration_exception_1.DeliveryOrchestrationException) {
                errorCode = 'ORCHESTRATION_ERROR';
            }
            else {
                errorCode = 'PROVIDER_INVOCATION_ERROR';
            }
            this.eventBus.publish(new delivery_failed_event_1.DeliveryFailedEvent(correlationId, context.tenantId, context.channel, currentStage, errorCode, error.message || 'An unexpected error occurred during delivery'));
            return new delivery_result_1.DeliveryResult(false, currentStage, correlationId, {
                code: errorCode,
                message: error.message || 'An unexpected error occurred during delivery',
            });
        }
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [template_rendering_service_1.TemplateRenderingService,
        routing_orchestrator_1.RoutingOrchestrator,
        cqrs_1.EventBus])
], DeliveryService);
//# sourceMappingURL=delivery.service.js.map