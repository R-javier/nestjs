// Importamos NestModule y MiddlewareConsumer para poder registrar middlewares.
import { Module, NestModule, MiddlewareConsumer, RequestMethod, ValidationPipe, Injectable } from '@nestjs/common';
import { APP_FILTER, APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// CAMBIO: usaremos AllExceptionsFilter como filtro global (hereda del base)
import { AllExceptionsFilter } from './cat/filters/all-exceptions.filter';
//Nuestro middleware personalizado para logs.
import { LoggerMiddleware } from './cat/logger.middleware';
import { CatModule } from './cat/cat.module';
import { CatController } from './cat/cat.controller';
import { RolesGuard } from './cat/guards/roles.guard';
import { LoggingInterceptor } from './cat/interceptors/logging.interceptor';
import { CatsRepository } from './cat/cat.repository';
import { ConfigModule } from './config/config.module';
import { connected } from 'node:process';
import { AnimalsModule } from './fundamentals/dynamic-modules/animals.module';


// Simulamos OptionsProvider como clase inyectable (mínimo para que compile).
@Injectable()
class OptionsProvider {
  get() {
    // Devuelve opciones de conexión 
  }
}

// Simulamos DatabaseConnection para el ejemplo
class DatabaseConnection {
  //ejemplo de database para connection
}

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    //return new DatabaseConnection(options);
    //Lo dejo comentado porque options rompe al no estar declarado
    //Segun la guia oficial.
  },
  inject: [OptionsProvider], //la factory recibe OptionProvider
};



//Provider no basado en servicios(useFactory)
const devConfig = {
  env: 'development',
  debug: true,
  message: 'Config dev utilizada',
};

const prodConfig = {
  env: 'production',
  debug: false,
  message: 'Config prod utilizada',
};


const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development'
      ? devConfig
      : prodConfig;
  },
};


//Ejemplo literal de la guia: useExisting(alias providers)
@Injectable()
class LoggerService {
  log(message: string) {
    console.log('[LoggerService]', message);
  }
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};


// NOTA: CatchEverythingFilter ya NO será global (lo podés dejar para uso local si querés)
// import { CatchEverythingFilter } from './cat/filters/catch-everything.filter';

@Module({
  imports: [
    CatModule,
     ConfigModule.register({environment: 'development'}),
     AnimalsModule.register({type: 'dog'}),
    ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // filtro global basado en BaseExceptionFilter
    },

    //pipe global
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
        provide: APP_GUARD,
        useClass: RolesGuard,      
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
    

    
  ],
  //Exportamos el token como lo hace la guia.
  exports: ['CONNECTION']
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


// Providers de clases (useClass)
// Nest permite resolver un mismo token a distintas clases
// usando la propiedad `useClass`.
//
// Ejemplo tomado de la documentación oficial:
//
// const configServiceProvider = {
//   provide: ConfigService,
//   useClass:
//     process.env.NODE_ENV === 'development'
//       ? DevelopmentConfigService
//       : ProductionConfigService,
// };
//
// Este patrón es útil cuando se necesita cambiar la
// implementación según el entorno (dev / prod).
//

//########################################

// EJEMPLO DE .forRoutes
// 1) Middleware aplicado a todas las rutas que comienzan con /cats.
// .forRoutes('cats'); ~ Todas las rutas que empiezan con /cats
//OTRAS OPCIONES
// 2) Middleware restringido a un método HTTP específico en este caso GET.
// .forRoutes({ path: 'cats', method: RequestMethod.GET }); ~ solo GET /cats
// 3) Middleware aplicado directamente a un controlador -
// Se aplique a todas las rutas que define CatsController, independientemente del path base.
// .forRoutes(CatController); ~ Todas las rutas del controlador