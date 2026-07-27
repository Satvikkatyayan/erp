import { Controller, Post, Param, Body } from '@nestjs/common';
import { WorkflowSimulatorService } from '../simulator/workflow-simulator.service';
import { WorkflowValidatorService } from '../validator/workflow-validator.service';
import { WorkflowReplayService } from '../replay/workflow-replay.service';

@Controller('api/v1/workflows')
export class WorkflowAdvancedController {
  constructor(
    private readonly simulator: WorkflowSimulatorService,
    private readonly validator: WorkflowValidatorService,
    private readonly replay: WorkflowReplayService
  ) {}

  @Post(':id/simulate')
  async simulate(@Param('id') id: string, @Body() payload: any) {
    return this.simulator.simulate(id, payload);
  }
  
  @Post(':id/validate')
  async validate(@Param('id') id: string, @Body() definition: any) {
    return this.validator.validateGraph(definition);
  }
  
  @Post(':id/replay')
  async replayWorkflow(@Param('id') id: string) {
    return this.replay.replayFromSnapshot(id);
  }
}