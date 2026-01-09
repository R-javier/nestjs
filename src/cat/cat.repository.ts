import { Injectable, Inject } from '@nestjs/common';

type Connection = {
  url: string;
  message: string;
};

@Injectable()
// Ejemplo directo de la guía: inyectar un provider por token de cadena.
export class CatsRepository {
  constructor(
    @Inject('CONNECTION') // usa el token literal, tal como pide la guía
    private readonly connection: Connection,
  ) {}

  info() {
    return `Conexión a ${this.connection.url} — ${this.connection.message}`;
  }
}
