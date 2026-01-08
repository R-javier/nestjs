import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(() => new BadGatewayException())),
      );
  }
}



// Este interceptor sirve para capturar errores y transformarlos o loguearlos.
// 1) A nivel controlador:
//    @UseInterceptors(ErrorsInterceptor)
// 2) A nivel método:
//    @UseInterceptors(ErrorsInterceptor)
// 3) GLOBAL:
//    app.useGlobalInterceptors(new ErrorsInterceptor());

