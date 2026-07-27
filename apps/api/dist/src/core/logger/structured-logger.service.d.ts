import { ConsoleLogger } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';
export declare class StructuredLogger extends ConsoleLogger {
    private readonly contextService;
    constructor(contextService: RequestContextService);
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug(message: any, ...optionalParams: any[]): void;
    verbose(message: any, ...optionalParams: any[]): void;
    private formatLogMessage;
}
//# sourceMappingURL=structured-logger.service.d.ts.map