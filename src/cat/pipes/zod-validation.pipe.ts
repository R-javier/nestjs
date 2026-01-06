import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value); // valida y transforma
      return parsedValue;
    } catch (error) {
      // Podés mejorar el detalle del error si querés (abajo te muestro cómo)
      throw new BadRequestException('Validation failed');
    }
  }
}
