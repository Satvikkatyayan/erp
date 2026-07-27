import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';

@Injectable({ scope: Scope.TRANSIENT })
export class StructuredLogger extends ConsoleLogger {
  constructor(private readonly contextService: RequestContextService) {
    super();
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(this.formatLogMessage(message), ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(this.formatLogMessage(message), ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(this.formatLogMessage(message), ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(this.formatLogMessage(message), ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(this.formatLogMessage(message), ...optionalParams);
  }

  private formatLogMessage(message: any): string {
    const correlationId = this.contextService.correlationId;
    const prefix = correlationId ? `[CorrID: ${correlationId}]` : '';
    return `${prefix} ${typeof message === 'object' ? JSON.stringify(message) : message}`;
  }
}