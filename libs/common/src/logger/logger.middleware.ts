import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';

const redactSensitiveData = (data: any, sensitiveFields: string[]): any => {
  if (!data || typeof data !== 'object') return data;

  return Object.entries(data).reduce((acc, [key, value]) => {
    const isSensitive = sensitiveFields.some((field) =>
      key.toLowerCase().includes(field.toLowerCase()),
    );

    if (isSensitive) {
      acc[key] = '***REDACTED***';
    } else if (Array.isArray(value)) {
      acc[key] = value.map((item) =>
        redactSensitiveData(item, sensitiveFields),
      );
    } else if (value !== null && typeof value === 'object') {
      acc[key] = redactSensitiveData(value, sensitiveFields);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const environment = this.configService.get('environment');
    if (environment === 'test') {
      return next();
    }

    const start = Date.now();
    const { method, url, headers, query, body } = req;

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const message = `${method} ${url} ${res.statusCode} ${responseTime}ms`;
      const statusCode = res.statusCode;
      const logData = redactSensitiveData(
        {
          responseTime,
          method,
          url,
          headers,
          query,
          body,
        },
        ['password'],
      );

      if (statusCode >= 500) {
        this.logger.error(message, undefined, `HTTP`, logData);
      } else if (statusCode >= 400) {
        this.logger.warn(message, `HTTP`, logData);
      } else {
        this.logger.log(message, `HTTP`, logData);
      }
    });

    next();
  }
}
