import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Cat } from "./providers/cat.interfaces"
import { APP_CONFIG, type AppConfig } from 'src/config/app.config';

@Injectable() // El decorador le dice a Nest que esta clase (CatsService) se puede manejar dentro de su contenedor de inversión de control (IoC)  
export class CatService {
  private readonly cats: Cat[] = []; 

constructor(
  @Inject(APP_CONFIG) private readonly config: AppConfig,
){}

count(): number{
  return this.cats.length;
}

 create(cat: Cat): Cat{
    if (this.cats.length >= this.config.maxCats) {
    throw new BadRequestException(`No se pueden agregar más de ${this.config.maxCats} gatos`);

 }
    this.cats.push(cat);
    return cat;
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