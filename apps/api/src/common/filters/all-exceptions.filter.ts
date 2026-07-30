import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCodes } from '../../core/errors/error-codes';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // Extract correlationId from context if it was set
    const requestId = (request as any).context?.correlationId || 'unknown-request-id';
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = ErrorCodes.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let details: any[] | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responsePayload = exception.getResponse() as any;
      
      message = typeof responsePayload === 'string' ? responsePayload : (responsePayload.message || 'Error');
      details = responsePayload.message && Array.isArray(responsePayload.message) ? responsePayload.message : undefined;
      
      // Standard HTTP Mappings
      if (status === HttpStatus.BAD_REQUEST) code = ErrorCodes.VALIDATION_ERROR;
      else if (status === HttpStatus.NOT_FOUND) code = ErrorCodes.RESOURCE_NOT_FOUND;
      else if (status === HttpStatus.FORBIDDEN || status === HttpStatus.UNAUTHORIZED) code = ErrorCodes.ACCESS_DENIED;
      else code = ErrorCodes.BAD_REQUEST;
      
      // Keep domain error codes if they passed one in
      if (responsePayload.error && typeof responsePayload.error === 'string') {
        code = responsePayload.error as any;
      }
    } else if (exception?.code?.startsWith('P')) {
      // Prisma Error Mappings
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        code = ErrorCodes.DATABASE_CONFLICT;
        message = 'A record with this value already exists.';
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        code = ErrorCodes.RECORD_NOT_FOUND;
        message = 'The requested record was not found.';
      } else if (exception.code === 'P2003') {
        status = HttpStatus.CONFLICT;
        code = ErrorCodes.FOREIGN_KEY_VIOLATION;
        message = 'Related record does not exist or cannot be deleted.';
      }
    } else if (exception instanceof Error) {
      // Unhandled standard errors
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        details
      },
      timestamp: new Date().toISOString(),
      requestId
    });
  }
}
