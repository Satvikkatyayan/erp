import { SchedulingPolicyInterface } from '../contracts/scheduling-policy.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class SchedulingPolicyService implements SchedulingPolicyInterface {
    determineReleaseTime(command: DispatchCommunicationCommand): Date;
}
//# sourceMappingURL=scheduling-policy.service.d.ts.map