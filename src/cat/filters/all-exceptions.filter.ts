
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()//Captura todas las excepciones
export class AllExceptionsFilter extends BaseExceptionFilter {
    // NOTA (guia): delegamos al filtro base
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
