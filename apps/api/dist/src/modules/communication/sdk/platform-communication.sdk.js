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
exports.PlatformCommunicationSDK = void 0;
const common_1 = require("@nestjs/common");
const dispatch_communication_handler_1 = require("../commands/handlers/dispatch-communication.handler");
const get_communication_history_handler_1 = require("../queries/handlers/get-communication-history.handler");
const dispatch_communication_command_1 = require("../commands/dispatch-communication.command");
const get_communication_history_query_1 = require("../queries/get-communication-history.query");
const communication_mapper_1 = require("../api/mappers/communication.mapper");
const channel_enum_1 = require("../domain/channel.enum");
let PlatformCommunicationSDK = class PlatformCommunicationSDK {
    constructor(dispatchHandler, historyHandler, mapper) {
        this.dispatchHandler = dispatchHandler;
        this.historyHandler = historyHandler;
        this.mapper = mapper;
    }
    async dispatch(tenantId, payload) {
        const command = new dispatch_communication_command_1.DispatchCommunicationCommand(tenantId, payload.recipient || 'unknown-recipient', payload.channel || channel_enum_1.Channel.EMAIL, 'legacy-template', payload.metadata || {});
        const result = await this.dispatchHandler.execute(command);
        return result;
    }
    async getHistory(tenantId, filters) {
        const query = new get_communication_history_query_1.GetCommunicationHistoryQuery(tenantId, filters);
        const records = await this.historyHandler.execute(query);
        return this.mapper.mapToHistoryDtoList(records);
    }
};
exports.PlatformCommunicationSDK = PlatformCommunicationSDK;
exports.PlatformCommunicationSDK = PlatformCommunicationSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dispatch_communication_handler_1.DispatchCommunicationHandler,
        get_communication_history_handler_1.GetCommunicationHistoryHandler,
        communication_mapper_1.CommunicationMapper])
], PlatformCommunicationSDK);
//# sourceMappingURL=platform-communication.sdk.js.map