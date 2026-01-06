
import { Injectable, Inject } from '@nestjs/common';
import {Cat} from "./providers/cat.interfaces"
@Injectable() // El decorador le dice a Nest que esta clase (CatsService) se puede manejar dentro de su contenedor de inversión de control (IoC)  
export class CatService {
  private readonly cats: Cat[] = []; 

   create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

 
}

@Injectable()
export class HttpService<T> {
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T;
}



@Injectable()
export class HttpService2<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}