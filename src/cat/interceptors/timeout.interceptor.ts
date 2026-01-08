import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  };
};



// Este interceptor produce un timeout si el controlador tarda más de 5s.
// ¿Cómo se implementa?
// 1) A nivel controlador:
//    @UseInterceptors(TimeoutInterceptor)
// 2) A nivel método:
//    @UseInterceptors(TimeoutInterceptor)
// 3) GLOBAL desde main.ts:
//    app.useGlobalInterceptors(new TimeoutInterceptor());
// Si el controlador no responde en 5 segundos ... RequestTimeoutException()

