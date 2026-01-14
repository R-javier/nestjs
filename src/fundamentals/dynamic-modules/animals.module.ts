import { DynamicModule, Module } from '@nestjs/common';

export interface AnimalsOptions {
  type: string;
}

export const ANIMALS_OPTIONS = 'ANIMALS_OPTIONS';

@Module({})
export class AnimalsModule {
  static register(options: AnimalsOptions): DynamicModule {
    return {
      module: AnimalsModule,
      providers: [{ provide: ANIMALS_OPTIONS, useValue: options }],
    };
  }
}
