import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { PlatformError } from '../../core/contracts/errors/platform.error';
export declare class PlatformExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: PlatformError, host: ArgumentsHost): {
        statusCode: number;
        code: string;
        message: string;
        correlationId: string;
        timestamp: string;
    };
    private mapErrorCodeToStatus;
}
//# sourceMappingURL=platform-exception.filter.d.ts.map