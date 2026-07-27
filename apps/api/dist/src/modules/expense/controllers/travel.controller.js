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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_facade_1 = require("../facades/expense.facade");
const travel_mapper_1 = require("../mappers/travel.mapper");
const travel_dto_1 = require("../dto/requests/travel.dto");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let TravelController = class TravelController {
    constructor(facade, mapper) {
        this.facade = facade;
        this.mapper = mapper;
    }
    async createTravel(dto) {
        const command = this.mapper.toCreateCommand(dto);
        await this.facade.executeCommand('CREATE_TRAVEL', command);
        return { success: true };
    }
    async updateTravel(id, dto) {
        const command = this.mapper.toUpdateCommand(id, dto);
        await this.facade.executeCommand('UPDATE_TRAVEL', command);
        return { success: true };
    }
    async submitTravel(id) {
        await this.facade.executeCommand('SUBMIT_TRAVEL', { id });
        return { success: true };
    }
    async cancelTravel(id) {
        await this.facade.executeCommand('CANCEL_TRAVEL', { id });
        return { success: true };
    }
    async attachBookings(id, dto) {
        await this.facade.executeCommand('ATTACH_BOOKINGS', { id, ...dto });
        return { success: true };
    }
    async requestAdvance(id, dto) {
        await this.facade.executeCommand('REQUEST_ADVANCE', { id, ...dto });
        return { success: true };
    }
};
exports.TravelController = TravelController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Create travel request' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [travel_dto_1.CreateTravelRequestDto]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "createTravel", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Update itinerary' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, travel_dto_1.UpdateTravelDto]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "updateTravel", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit request' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "submitTravel", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel request' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "cancelTravel", null);
__decorate([
    (0, common_1.Post)(':id/bookings'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Attach bookings' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "attachBookings", null);
__decorate([
    (0, common_1.Post)(':id/advance'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Request travel advance' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "requestAdvance", null);
exports.TravelController = TravelController = __decorate([
    (0, swagger_1.ApiTags)('Travel'),
    (0, common_1.Controller)('travel'),
    __metadata("design:paramtypes", [expense_facade_1.ExpenseFacade,
        travel_mapper_1.TravelMapper])
], TravelController);
//# sourceMappingURL=travel.controller.js.map