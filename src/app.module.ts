import { Module } from '@nestjs/common';
import { CatsController } from './cat/cats.controller'; //Modificamos AppController por CatsController

@Module({
  imports: [],
  providers:[],
  controllers: [CatsController], //Agregamos - Mismo procedimiento 
})
export class AppModule {}
