import { Global, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { RequestContextService } from './request-context.service';
import { CorrelationIdMiddleware } from './correlation-id.middleware';
import { ContextFactory } from './context.factory';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: false }, // Mounted manually to ensure order
    }),
  ],
  providers: [RequestContextService, ContextFactory],
  exports: [RequestContextService, ContextFactory],
})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}