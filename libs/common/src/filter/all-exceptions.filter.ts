import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] = [];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const { message: msg, error } = exceptionResponse as any;
        message = msg || error || message;

        // Optional: include validation errors
        if (Array.isArray(msg)) {
          errors = msg;
          message = 'Validation failed';
        }
      }
    }

    response.status(statusCode).json({
      data: null,
      status: false,
      statusCode,
      message,
      ...(errors.length ? { errors } : {}),
    });
  }
}
