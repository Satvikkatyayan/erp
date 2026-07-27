import { Injectable } from '@nestjs/common';
import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';

@Injectable()
export class RiskProjectionService<TEvent> implements ProjectionHandler<TEvent> {
  supports(event: TEvent): boolean {
    return true; // Implement specific logic
  }

  async project(event: TEvent): Promise<void> {
    // Risk projection logic here
  }
}
