import { Injectable } from '@nestjs/common';
import { WorkflowDecisionInterface, WorkflowDecisionResult } from '../contracts/workflow-decision.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

@Injectable()
export class WorkflowDecisionService implements WorkflowDecisionInterface {
  evaluate(command: DispatchCommunicationCommand): WorkflowDecisionResult {
    // Basic single-step determination for now.
    // Future milestones (BPMN, UI designer) will implement complex traversal here.
    return new WorkflowDecisionResult(
      'SINGLE_DISPATCH',
      false, // shouldPause
      true   // shouldTerminate (after this step)
    );
  }
}
