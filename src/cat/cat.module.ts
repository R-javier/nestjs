import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  controllers: [CatController],//Registra EL controller
  providers: [CatService], //Registra EL provider (service)
  exports: [CatService], // (solo si otro módulo lo necesita el service)
})
export class CatModule {}
