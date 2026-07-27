import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxService } from './outbox.service';
import { OutboxRelayWorker } from './outbox-relay.worker';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [OutboxService, OutboxRelayWorker],
  exports: [OutboxService],
})
export class OutboxModule {}