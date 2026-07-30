import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TelemetryService } from './services/telemetry.service';
import { TraceContextService } from './context/trace-context.service';
import { DeliveryLifecycleObserver } from './observers/delivery-lifecycle.observer';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: 'TelemetryInterface',
      useClass: TelemetryService
    },
    TraceContextService,
    DeliveryLifecycleObserver
  ],
  exports: ['TelemetryInterface', TraceContextService]
})
export class ObservabilityModule {}
