import { Module, Global, DynamicModule } from '@nestjs/common';
import { APP_CONFIG, appConfig } from './app.config';

@Global()
@Module({})
export class ConfigModule {
  static register(options: any): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
      {
      provide: APP_CONFIG,
      useValue: options,
      },
    ],
    exports: [APP_CONFIG],
    };
  }
}
