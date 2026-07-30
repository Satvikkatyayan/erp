import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

export interface SchedulingPolicyInterface {
  determineReleaseTime(command: DispatchCommunicationCommand): Date;
}
