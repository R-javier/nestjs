import { Test } from '@nestjs/testing';
import { ConfigModule } from './config.module';
import { APP_CONFIG } from './app.config';

describe('ConfigModule.register (dynamic)', () => {
  it('debe proveer APP_CONFIG con las opciones (mínimo)', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.register({ environment: 'dev', maxCats: 5 })],
    }).compile();

    const config = moduleRef.get(APP_CONFIG);
    expect(config).toEqual({ environment: 'dev', maxCats:5});
  });
});

