import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}



// Este interceptor se usa para loguear antes y después de cada request.

// 1) A nivel controlador:
//    @UseInterceptors(LoggingInterceptor)
//    export class CatsController {}
// 2) A nivel método:
//    @UseInterceptors(LoggingInterceptor)
//    @Get()
//    findAll() {}
// 3) GLOBAL desde main.ts:
//    app.useGlobalInterceptors(new LoggingInterceptor());
// 4) GLOBAL con DI:
//    providers: [
//      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }
//    ]
//
// Este NO modifica la respuesta, solo loguea.
