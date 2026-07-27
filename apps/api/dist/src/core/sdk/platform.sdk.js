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
var PlatformSDK_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformSDK = void 0;
const common_1 = require("@nestjs/common");
const sdk_pipeline_1 = require("./middleware/sdk-pipeline");
const platform_error_1 = require("../contracts/errors/platform.error");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let PlatformSDK = PlatformSDK_1 = class PlatformSDK {
    constructor(prisma) {
        this.prisma = prisma;
        this.pipeline = new sdk_pipeline_1.SDKMiddlewarePipeline();
        this.logger = new common_1.Logger(PlatformSDK_1.name);
        this.forms = {
            submit: (ctx, payload) => this.pipeline.execute(ctx, 'FormsEngine', 'submit', async () => {
                if (!payload.name)
                    throw new platform_error_1.ValidationError('Name is required on form submission.', ctx.correlationId);
                return { id: 'form-123', status: 'SUBMITTED' };
            })
        };
        this.workflow = {
            trigger: (ctx, docId) => this.pipeline.execute(ctx, 'WorkflowEngine', 'trigger', async () => {
                return { workflowId: 'wf-999', status: 'IN_PROGRESS' };
            })
        };
        this.rules = {
            evaluate: async (ctx, policyName, inputs) => this.pipeline.execute(ctx, 'RulesEngine', 'evaluate', async () => {
                return { prefix: 'EMP' };
            })
        };
        this.events = {
            publish: async (ctx, eventName, payload) => this.pipeline.execute(ctx, 'EventBus', 'publish', async () => {
                await this.prisma.outboxMessage.create({
                    data: { eventName, payload: payload || {}, correlationId: ctx.correlationId, state: 'PENDING' }
                });
                return { status: 'PUBLISHED' };
            })
        };
        this.search = {
            index: async (ctx, indexName, docId, payload) => this.pipeline.execute(ctx, 'SearchEngine', 'index', async () => {
                return { status: 'INDEXED' };
            })
        };
        this.reporting = {
            registerDataset: async (ctx, datasetName, schema) => this.pipeline.execute(ctx, 'ReportingEngine', 'registerDataset', async () => {
                return { status: 'REGISTERED' };
            })
        };
    }
    checkHealth() {
        return {
            engine: 'UnifiedPlatformSDK',
            version: '1.0.0',
            status: 'HEALTHY',
            capabilities: ['forms', 'workflow', 'storage', 'rules', 'notification', 'search', 'reporting']
        };
    }
};
exports.PlatformSDK = PlatformSDK;
exports.PlatformSDK = PlatformSDK = PlatformSDK_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlatformSDK);
//# sourceMappingURL=platform.sdk.js.map