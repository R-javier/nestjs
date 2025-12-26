import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService], // (solo si otro módulo lo necesita)
})
export class CatModule {}
