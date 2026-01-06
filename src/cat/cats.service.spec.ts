
import { CatService } from '../cat/cat.service';

describe('CatsService', () => {
   it('findAll devuelve array vacío al inicio', () => {
    const service = new CatService();
    expect(service.findAll()).toEqual([])
  });

  it('findAll no debe devolver nulls', () => {
    const service = new CatService();
    service.create({ name:'Tom' } as any);
   
    const cats = service.findAll();
    expect(Array.isArray(cats)).toBe(true)
    expect(cats.every(cat => cat != null)).toBe(true);
  });

 
  it('create agrega el item y findAll lo retorna', () => {
    const service = new CatService();
    const tom = { name : 'Tom' } as any;

    service.create(tom);
    const list = service.findAll();

    expect(list).toHaveLength(1);
    expect(list[0]).toEqual(tom);
  })
});
 