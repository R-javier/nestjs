
import { ZodValidationPipe } from './zod-validation.pipe';
import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

describe('ZodValidationPipe', () => {
  const schema = z.object({ name: z.string() });
  const pipe = new ZodValidationPipe(schema);

  it('valida correctamente body válido', () => {
    expect(pipe.transform({ name: 'Tom' }, {} as any)).toEqual({ name: 'Tom' });
  });

  it('lanza BadRequest si falta name', () => {
    expect(() => pipe.transform({}, {} as any)).toThrow(BadRequestException);
  });
});
