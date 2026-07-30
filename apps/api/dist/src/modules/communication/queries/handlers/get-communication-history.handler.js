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
exports.GetCommunicationHistoryHandler = void 0;
const common_1 = require("@nestjs/common");
const communication_query_service_1 = require("../../services/communication-query.service");
let GetCommunicationHistoryHandler = class GetCommunicationHistoryHandler {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async execute(query) {
        return this.queryService.getHistory(query);
    }
};
exports.GetCommunicationHistoryHandler = GetCommunicationHistoryHandler;
exports.GetCommunicationHistoryHandler = GetCommunicationHistoryHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [communication_query_service_1.CommunicationQueryService])
], GetCommunicationHistoryHandler);
//# sourceMappingURL=get-communication-history.handler.js.map