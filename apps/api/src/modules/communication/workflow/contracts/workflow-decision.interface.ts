import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

export class WorkflowDecisionResult {
  constructor(
    public readonly nextActivityType: string | null,
    public readonly shouldPause: boolean,
    public readonly shouldTerminate: boolean
  ) {
    Object.freeze(this);
  }
}

export interface WorkflowDecisionInterface {
  evaluate(command: DispatchCommunicationCommand): WorkflowDecisionResult;
}
