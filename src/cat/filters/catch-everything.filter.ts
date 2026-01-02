
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
@Catch() // sin parámetros: atrapa cualquier excepción
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // En ciertos casos el httpAdapter puede no estar listo en el constructor
    // Este es el filtro custom. Ya NO será global.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      // Opcional: mensaje genérico o nombre de la excepción
      ...(exception instanceof Error
        ? { message: exception.message, error: exception.name }
        : { message: 'Unexpected error' }),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
