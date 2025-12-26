
import { Injectable, Inject } from '@nestjs/common';
import {Cat} from "./providers/cat.interfaces"
@Injectable()   
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
