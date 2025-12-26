
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  private cats = ['Michi', 'Garfield'];

  findAll(): string[] {
    return this.cats;
  }

  create(name: string): void {
    this.cats.push(name);
  }
}
