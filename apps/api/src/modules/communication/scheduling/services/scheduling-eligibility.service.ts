import { Injectable } from '@nestjs/common';
import { SchedulingEligibilityInterface } from '../contracts/scheduling-eligibility.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

@Injectable()
export class SchedulingEligibilityService implements SchedulingEligibilityInterface {
  isEligibleForScheduling(command: DispatchCommunicationCommand): boolean {
    if (command.payload && command.payload.executeAt) {
      return true;
    }
    return false;
  }
}
