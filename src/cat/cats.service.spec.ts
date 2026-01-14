import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { APP_CONFIG } from '../config/app.config';

describe('CatService con APP_CONFIG', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: APP_CONFIG,
          useValue: { environment: 'dev', maxCats: 5 }},
      ],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


//Test caso negativo

  it('allows creating exactly 5 cats (pasa)', async () => {
    for (let i = 1; i <= 5; i++) {
      const result = service.create({ id: i, name: `Cat ${i}` } as any);
      expect(result).toBeDefined();
    }
  })

  

//Test caso positivo 
it('throws when adding more than 5 cats (case negativo)', () => {
    for (let i = 1; i <= 5; i++) {
      service.create({ id: i, name: `Cat ${i}` } as any);
    }
    expect(() =>
      service.create({ id: 6, name: 'Cat 6' } as any)
    ).toThrow(/No se pueden agregar más de 5 gatos/i);
  });

});





// describe('CatsService', () => {
//    it('findAll devuelve array vacío al inicio', () => {
//     const service = new CatService();
//     expect(service.findAll()).toEqual([])
//   });

//   it('findAll no debe devolver nulls', () => {
//     const service = new CatService();
//     service.create({ name:'Tom' } as any);
   
//     const cats = service.findAll();
//     expect(Array.isArray(cats)).toBe(true)
//     expect(cats.every(cat => cat != null)).toBe(true);
//   });

 
//   it('create agrega el item y findAll lo retorna', () => {
//     const service = new CatService();
//     const tom = { name : 'Tom' } as any;

//     service.create(tom);
//     const list = service.findAll();

//     expect(list).toHaveLength(1);
//     expect(list[0]).toEqual(tom);
//   })
// });
 
