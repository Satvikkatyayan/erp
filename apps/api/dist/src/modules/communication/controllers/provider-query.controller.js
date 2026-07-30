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
exports.ProviderQueryController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const get_registered_providers_query_1 = require("../queries/get-registered-providers.query");
const provider_mapper_1 = require("../api/mappers/provider.mapper");
let ProviderQueryController = class ProviderQueryController {
    constructor(queryBus, providerMapper) {
        this.queryBus = queryBus;
        this.providerMapper = providerMapper;
    }
    async getRegisteredProviders() {
        const result = await this.queryBus.execute(new get_registered_providers_query_1.GetRegisteredProvidersQuery());
        return this.providerMapper.success(this.providerMapper.mapToResponseDto(result), 'Registered providers retrieved successfully');
    }
};
exports.ProviderQueryController = ProviderQueryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of registered providers and their capabilities' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProviderQueryController.prototype, "getRegisteredProviders", null);
exports.ProviderQueryController = ProviderQueryController = __decorate([
    (0, swagger_1.ApiTags)('Communication Provider Management'),
    (0, common_1.Controller)('communication/providers'),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        provider_mapper_1.ProviderMapper])
], ProviderQueryController);
//# sourceMappingURL=provider-query.controller.js.map