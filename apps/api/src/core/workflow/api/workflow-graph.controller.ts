import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1/workflows/:id/graph')
export class WorkflowGraphController {
  
  @Get()
  async getGraphModel(@Param('id') id: string) {
    // Generate React Flow compatible graph layout
    return {
      nodes: [
        { id: 'node-1', type: 'state', data: { label: 'Draft' } }
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', label: 'Submit' }
      ]
    };
  }
}