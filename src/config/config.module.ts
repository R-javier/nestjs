import { Module, Global } from '@nestjs/common';
import { APP_CONFIG, appConfig } from './app.config';

@Global()
@Module({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
  ],
  exports: [APP_CONFIG],
})
export class ConfigModule {}
