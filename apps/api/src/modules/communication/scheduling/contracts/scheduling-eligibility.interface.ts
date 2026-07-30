import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

export interface SchedulingEligibilityInterface {
  isEligibleForScheduling(command: DispatchCommunicationCommand): boolean;
}
