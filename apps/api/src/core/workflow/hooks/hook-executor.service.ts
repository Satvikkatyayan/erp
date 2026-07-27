import { Injectable } from '@nestjs/common';

@Injectable()
export class HookExecutorService {
  async executeOnEnter(stateId: string, context: any) {
    // Logic to execute onEnter hooks
  }

  async executeOnExit(stateId: string, context: any) {
    // Logic to execute onExit hooks
  }

  async executeCompensation(transitionId: string, context: any) {
    // Logic to execute rollback/compensation hooks
  }
}