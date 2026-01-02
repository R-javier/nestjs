// Importamos NestModule y MiddlewareConsumer para poder registrar middlewares.
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
// CAMBIO: usaremos AllExceptionsFilter como filtro global (hereda del base)
import { AllExceptionsFilter } from './cat/filters/all-exceptions.filter';
//Nuestro middleware personalizado para logs.
import { LoggerMiddleware } from './cat/logger.middleware';
import { CatModule } from './cat/cat.module';
import { CatController } from './cat/cat.controller';
// NOTA: CatchEverythingFilter ya NO será global (lo podés dejar para uso local si querés)
// import { CatchEverythingFilter } from './cat/filters/catch-everything.filter';

@Module({
  imports: [CatModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // CAMBIO: filtro global basado en BaseExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
// El middleware se configura acá, no dentro del decorador 
// @Module().
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)//Registramos el middleware que queremos aplicar
    
   .forRoutes(CatController); //Definimos a que rutas o controladores se aplica(en este caso, todas 
    //las rutas 'cats')
    
  }
}


// EJEMPLO DE .forRoutes
// 1) Middleware aplicado a todas las rutas que comienzan con /cats.
// .forRoutes('cats'); ~ Todas las rutas que empiezan con /cats
//OTRAS OPCIONES
// 2) Middleware restringido a un método HTTP específico en este caso GET.
// .forRoutes({ path: 'cats', method: RequestMethod.GET }); ~ solo GET /cats
// 3) Middleware aplicado directamente a un controlador -
// Se aplique a todas las rutas que define CatsController, independientemente del path base.
// .forRoutes(CatController); ~ Todas las rutas del controlador