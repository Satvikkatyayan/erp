import { LoggerService } from '@nestjs/common';
export declare class AppLogger implements LoggerService {
    private context?;
    setContext(context: string): void;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug?(message: any, ...optionalParams: any[]): void;
    verbose?(message: any, ...optionalParams: any[]): void;
}
//# sourceMappingURL=app-logger.service.d.ts.map