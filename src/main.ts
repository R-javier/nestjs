import {NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


 // CAMBIO: quitar registro global aquí para evitar duplicar filtros
  // import { HttpAdapterHost } from '@nestjs/core';
  // import { AllExceptionsFilter } from './cat/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
