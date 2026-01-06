import { HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  it('devuelve el status correcto', () => {
    const json = jest.fn(); //fingimos un response.json()
    const status = jest.fn(() => ({ json })); //falso response.status()
    //que devuelve un objeto con json()
    const host = {
      switchToHttp: () => ({
        getResponse: () => ({ status }),
        getRequest: () => ({ url: '/test' }),
      }),
    } as any;

    const filter = new HttpExceptionFilter();
    filter.catch(new HttpException('Error', 400), host);

    expect(status).toHaveBeenCalledWith(400);
  });
});
