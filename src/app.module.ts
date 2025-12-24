import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller'; //Modificamos AppController por CatsController

@Module({
  imports: [],
  controllers: [CatsController], //Agregamos - Mismo procedimiento 
})
export class AppModule {}
