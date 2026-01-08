import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next
    .handle()
    .pipe(map(data => ({ data })));
  }
}



// Este interceptor envuelve la respuesta del controlador en:
// { data: ... }
// Ejemplo: [] → { data: [] }
// 1) A nivel controlador:
//    @UseInterceptors(TransformInterceptor)
// 2) A nivel método:
//    @UseInterceptors(TransformInterceptor)
//    @Get()
//    findAll() {}
// 3) GLOBAL desde main.ts (si querés que TODA la API devuelva { data: ... }):
//    app.useGlobalInterceptors(new TransformInterceptor());
// 4) GLOBAL vía APP_INTERCEPTOR (si necesita DI):
//    providers: [
//      { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
//    ]

