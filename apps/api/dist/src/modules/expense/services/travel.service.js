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
exports.TravelService = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
const repository_interfaces_1 = require("../interfaces/repository.interfaces");
let TravelService = class TravelService {
    constructor(context, travelRepo) {
        this.context = context;
        this.travelRepo = travelRepo;
    }
    async requestTravel(payload) {
        const ctx = this.context.getContext();
        await this.travelRepo.createRequest(payload);
        return { status: 'TRAVEL_REQUESTED', employeeId: ctx.employee.id };
    }
    async addItinerary(travelId, itinerary) {
        return { status: 'ITINERARY_ADDED', travelId };
    }
    async addBookingReference(travelId, ref) {
        return { status: 'BOOKING_REF_ADDED', travelId };
    }
    async completeTravel(travelId) {
        return { status: 'TRAVEL_COMPLETED', travelId };
    }
    async linkExpenseClaim(travelId, claimId) {
        return { status: 'CLAIM_LINKED', travelId, claimId };
    }
};
exports.TravelService = TravelService;
exports.TravelService = TravelService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(repository_interfaces_1.TRAVEL_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext, Object])
], TravelService);
//# sourceMappingURL=travel.service.js.map