import { EventBus } from '@nestjs/cqrs';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { SchedulingEligibilityInterface } from '../contracts/scheduling-eligibility.interface';
import { SchedulingPolicyInterface } from '../contracts/scheduling-policy.interface';
import { DeliveryServiceInterface } from '../../contracts/delivery-service.interface';
import { DeliveryResult } from '../../domain/delivery-result';
export declare class SchedulingOrchestrator {
    private readonly eligibilityService;
    private readonly policyService;
    private readonly deliveryService;
    private readonly eventBus;
    constructor(eligibilityService: SchedulingEligibilityInterface, policyService: SchedulingPolicyInterface, deliveryService: DeliveryServiceInterface, eventBus: EventBus);
    processCommand(command: DispatchCommunicationCommand): Promise<DeliveryResult>;
}
//# sourceMappingURL=scheduling.orchestrator.d.ts.map