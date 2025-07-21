import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((originalData: any) => {
        const statusCode = response.statusCode || 200;

        const wrapped = {
          data: originalData?.data ?? originalData,
          status: true,
          statusCode,
          message: originalData?.message || 'Success',
          ...(originalData?.meta ? { meta: originalData.meta } : {}),
        };

        return wrapped;
      }),
    );
  }
}
