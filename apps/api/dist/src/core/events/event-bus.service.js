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
exports.EventBusService = void 0;
const common_1 = require("@nestjs/common");
const event_publisher_interface_1 = require("./interfaces/event-publisher.interface");
let EventBusService = class EventBusService {
    constructor(publisher) {
        this.publisher = publisher;
    }
    async publish(event) {
        await this.publisher.publish(event);
    }
    async publishBatch(events) {
        await this.publisher.publishBatch(events);
    }
    subscribe(eventName, handler) {
    }
};
exports.EventBusService = EventBusService;
exports.EventBusService = EventBusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_publisher_interface_1.EVENT_PUBLISHER)),
    __metadata("design:paramtypes", [Object])
], EventBusService);
//# sourceMappingURL=event-bus.service.js.map