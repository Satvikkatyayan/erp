import { LoggerService, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(`[INFO] [${this.context || 'App'}] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(`[ERROR] [${this.context || 'App'}] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[WARN] [${this.context || 'App'}] ${message}`, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(`[DEBUG] [${this.context || 'App'}] ${message}`, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`[VERBOSE] [${this.context || 'App'}] ${message}`, ...optionalParams);
  }
}
