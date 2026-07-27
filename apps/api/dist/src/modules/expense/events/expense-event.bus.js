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
exports.ExpenseEventBus = void 0;
const common_1 = require("@nestjs/common");
const event_registry_1 = require("../../../core/registry/event.registry");
const processed_event_store_1 = require("./idempotency/processed-event.store");
let ExpenseEventBus = class ExpenseEventBus {
    constructor(registry, idempotencyStore) {
        this.registry = registry;
        this.idempotencyStore = idempotencyStore;
    }
    async publish(event) {
        const handlers = this.registry.getHandlers(event.eventType);
        for (const handler of handlers) {
            const handlerId = handler.constructor.name;
            const isProcessed = await this.idempotencyStore.isProcessed(event.eventId, handlerId);
            if (!isProcessed) {
                await handler.handle(event);
                await this.idempotencyStore.markAsProcessed(event.eventId, handlerId);
            }
        }
    }
    async publishBatch(events) {
        for (const event of events) {
            await this.publish(event);
        }
    }
    subscribe(eventType, handler) {
        this.registry.register(eventType, handler);
    }
    unsubscribe(eventType, handler) {
    }
};
exports.ExpenseEventBus = ExpenseEventBus;
exports.ExpenseEventBus = ExpenseEventBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_registry_1.EventRegistry,
        processed_event_store_1.ProcessedEventStore])
], ExpenseEventBus);
//# sourceMappingURL=expense-event.bus.js.map