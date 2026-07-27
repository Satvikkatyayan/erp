"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const queues_constant_1 = require("./constants/queues.constant");
const event_bus_service_1 = require("./event-bus.service");
const bullmq_publisher_service_1 = require("./bullmq/bullmq-publisher.service");
const event_publisher_interface_1 = require("./interfaces/event-publisher.interface");
const distributed_lock_service_1 = require("../cache/distributed-lock.service");
const event_registry_1 = require("../registry/event.registry");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({ name: queues_constant_1.QUEUES.WORKFLOW }, { name: queues_constant_1.QUEUES.NOTIFICATION }, { name: queues_constant_1.QUEUES.REPORT }, { name: queues_constant_1.QUEUES.SEARCH }, { name: queues_constant_1.QUEUES.INTEGRATION }, { name: queues_constant_1.QUEUES.DOCUMENT }, { name: queues_constant_1.QUEUES.AUDIT }, { name: queues_constant_1.QUEUES.SCHEDULER }),
        ],
        providers: [
            {
                provide: event_publisher_interface_1.EVENT_PUBLISHER,
                useClass: bullmq_publisher_service_1.BullMQPublisher,
            },
            event_bus_service_1.EventBusService,
            distributed_lock_service_1.DistributedLockService,
            event_registry_1.EventRegistry,
        ],
        exports: [event_bus_service_1.EventBusService, distributed_lock_service_1.DistributedLockService, event_registry_1.EventRegistry],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map