import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}




// Este interceptor DEMUESTRA cómo evitar que el controlador se ejecute.
// Si "isCached" es true → devuelve una respuesta inmediatamente.
// 1) A nivel controlador:
//    @UseInterceptors(CacheInterceptor)
// 2) A nivel método:
//    @UseInterceptors(CacheInterceptor)
// 3) GLOBAL (devolvería siempre [] → solo para pruebas):
//    app.useGlobalInterceptors(new CacheInterceptor());

