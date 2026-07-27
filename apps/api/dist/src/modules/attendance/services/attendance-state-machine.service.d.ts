import { MusterWorkflowStatus } from '@prisma/client';
export interface TransitionContext {
    from: MusterWorkflowStatus;
    to: MusterWorkflowStatus;
    actorId: string;
    actorRoles: string[];
}
export declare class AttendanceStateMachine {
    private readonly validTransitions;
    canTransition(from: MusterWorkflowStatus, to: MusterWorkflowStatus): boolean;
    validateTransition(ctx: TransitionContext): void;
    transition(from: MusterWorkflowStatus, to: MusterWorkflowStatus): MusterWorkflowStatus;
}
//# sourceMappingURL=attendance-state-machine.service.d.ts.map