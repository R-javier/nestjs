import { CacheInterceptor } from "./cache.interceptor";

describe('CacheInterceptor', () => {
    it('debería devolver [] porque isCached siempre es true', () => {
        const interceptor = new CacheInterceptor();

        //next no importa porque no se usa nunca. nunca llegamos a usarlo.
        const next: any= {};

        interceptor.intercept({} as any, next).subscribe(resultado => {
            expect(resultado).toEqual([]); //lo que realmente importa
        
        })
    })  
})