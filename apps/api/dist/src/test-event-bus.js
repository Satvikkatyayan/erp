"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const outbox_service_1 = require("./core/outbox/outbox.service");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('EventBusTestRunner');
    logger.log('Bootstrapping Test Runner...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const outboxService = app.get(outbox_service_1.OutboxService);
    const testEvent = {
        eventId: (0, uuid_1.v4)(),
        eventName: 'TestEventFired',
        payload: { message: 'Hello from Outbox' },
        timestamp: new Date(),
        correlationId: (0, uuid_1.v4)(),
        causationId: null,
        version: 1,
    };
    logger.log('1. Testing Outbox Persistence...');
    await outboxService.saveEvent(testEvent);
    logger.log('Outbox message saved successfully. The OutboxRelayWorker should pick it up shortly.');
    logger.log('Waiting 10 seconds for the OutboxRelayWorker to poll...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    logger.log('Test completed. (To fully test DLQ and Locking, we need an explicit worker handler for TestEventFired, which defaults to AUDIT queue).');
    await app.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=test-event-bus.js.map