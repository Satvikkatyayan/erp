import { Injectable } from '@nestjs/common';
import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';

@Injectable()
export class TravelProjectionService<TEvent> implements ProjectionHandler<TEvent> {
  supports(event: TEvent): boolean {
    return true; // Implement specific logic
  }

  async project(event: TEvent): Promise<void> {
    // Travel projection logic here
  }
}
