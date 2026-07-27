"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessedEventStore = void 0;
const common_1 = require("@nestjs/common");
let ProcessedEventStore = class ProcessedEventStore {
    constructor() {
        this.processedEvents = new Set();
    }
    async isProcessed(eventId, handlerId) {
        const key = `${eventId}:${handlerId}`;
        return this.processedEvents.has(key);
    }
    async markAsProcessed(eventId, handlerId) {
        const key = `${eventId}:${handlerId}`;
        this.processedEvents.add(key);
    }
};
exports.ProcessedEventStore = ProcessedEventStore;
exports.ProcessedEventStore = ProcessedEventStore = __decorate([
    (0, common_1.Injectable)()
], ProcessedEventStore);
//# sourceMappingURL=processed-event.store.js.map