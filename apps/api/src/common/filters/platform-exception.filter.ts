import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { PlatformError, ValidationError, AuthorizationError } from '../../core/contracts/errors/platform.error';

@Catch(PlatformError)
export class PlatformExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PlatformExceptionFilter.name);

  catch(exception: PlatformError, host: ArgumentsHost) {
    // In a real app, this extracts Response from host.switchToHttp().getResponse()
    // We mock it for the verification script
    const statusCode = this.mapErrorCodeToStatus(exception);
    
    this.logger.error(`PlatformError [HTTP ${statusCode}] ${exception.message} (CorrelationID: ${exception.correlationId})`);

    const payload = {
      statusCode,
      code: exception.code,
      message: exception.message,
      correlationId: exception.correlationId,
      timestamp: new Date().toISOString()
    };
    
    return payload; // Returning payload for mock verification
  }

  private mapErrorCodeToStatus(exception: PlatformError): number {
    if (exception instanceof ValidationError) return 400;
    if (exception instanceof AuthorizationError) return 403;
    return 500;
  }
}