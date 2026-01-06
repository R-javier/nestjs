import { Module, Global } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Global()
@Module({
  controllers: [CatController],//Registra EL controller
  providers: [CatService], //Registra EL provider (service)
  exports: [CatService], // (solo si otro módulo lo necesita el service)
})
export class CatModule {
    constructor(private catService: CatService){}
}

 // -Un módulo en NestJS es simplemente una clase decorada con @Module().
 // -Este decorador le indica a Nest cómo organizar la aplicación y manejar sus componentes.
 // -lo que exporta un módulo es su “interfaz pública”, lo que comparte con el resto de la app.