
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsModule, ANIMALS_OPTIONS } from './animals.module';

describe('AnimalsModule (dynamic)', () => {
  it('should register with type "dog"', async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AnimalsModule.register({ type: 'dog' })],
    }).compile();

    const animalsOptions = testingModule.get<{ type: string }>(ANIMALS_OPTIONS);

    expect(animalsOptions).toBeDefined();
    expect(animalsOptions.type).toBe('dog');
  });

  it('should NOT have type "dog" when registering a different animal', async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AnimalsModule.register({ type: 'cat' })],
    }).compile();

    const animalsOptions = testingModule.get<{ type: string }>(ANIMALS_OPTIONS);

    expect(animalsOptions).toBeDefined();
    expect(animalsOptions.type).not.toBe('dog');
    expect(animalsOptions.type).toBe('cat');     
  });
});
