import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error';
    let errors: any[] = [];

    // Handle specific Prisma error codes
    switch (exception.code) {
      case 'P2002': {
        // Unique constraint failed
        const fields = ((exception.meta?.target as string[]) || []).join(', ');
        statusCode = HttpStatus.CONFLICT;
        message = `${fields} already exists`;
        break;
      }

      case 'P2003': {
        // Foreign key constraint failed
        statusCode = HttpStatus.BAD_REQUEST;
        message = `Invalid foreign key reference`;
        break;
      }

      case 'P2025': {
        // Record not found
        statusCode = HttpStatus.NOT_FOUND;
        message = `Record not found`;
        break;
      }

      default: {
        // Log unknown Prisma error codes
        console.error('Unhandled Prisma error:', exception);
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
