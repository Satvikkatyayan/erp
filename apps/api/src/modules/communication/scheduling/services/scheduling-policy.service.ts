import { Injectable } from '@nestjs/common';
import { SchedulingPolicyInterface } from '../contracts/scheduling-policy.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

@Injectable()
export class SchedulingPolicyService implements SchedulingPolicyInterface {
  determineReleaseTime(command: DispatchCommunicationCommand): Date {
    const executeAt = command.payload?.executeAt;
    if (executeAt && typeof executeAt === 'string') {
      return new Date(executeAt);
    }
    return new Date();
  }
}
