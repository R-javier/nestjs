import { Controller, Get, Post, HttpCode, Header, Req, Redirect, Query, Bind, Param } from '@nestjs/common';
import type { Request } from 'express';


@Controller('cats') // Ruta base: /cats
export class CatController {
  @Post()// el status code predeterminado para respuestas siempre es 200(OK Operación exitosa).
  //EXCEPTO para solicitudes POST cuyo valor es 201(Recurso creado correctamente).

  @HttpCode(204)//Operación exitosa - No content

  @Header('Cache-Control', 'no-store') //Encabezados de respuesta 
  //No guardar nada en caché 
  //Evita que cliente o proxies almacenen la respuesta en caché.

  create(): string{
    return 'This action adds a new cat';
  }

  @Get() // Maneja GET /cats
  @Redirect('https://nestjs.com', 301) //'URL direccion a la que el cliente será redirigido'
 //statusCode 301- redirección permanente.
 findAll(@Req() request: Request): string{
 // Acá tenés acceso a todo lo que viene en la solicitud
 // request.(headers, params, query, body, cookies, ip, etc.)
 // Usar nombres claros y semánticos.
  return 'This action returns all cats';
 }

 @Get('abcd/*wildcard')//El controlador tiene base @Controller('cats'), así que todas las rutas empiezan con /cats.
 //El segmento abcd/*wildcard significa: coincide con cualquier cosa después de /cats/abcd/.
 //ejemplo de url http://localhost:3000/cats/abcd/cat
 findWildcard(){
  return 'This route uses a wildcard'
 }


  @Get()
  async findByAgeAndBreed(@Query('age') age?: number, @Query('breed') breed?: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }


  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)//@Redirect redirige respuesta a otra URL.
  //Redirección temporal(302 por defecto)
  getDocs(@Query('version') version: string) {
    //@Query() permite leer parámetros de consulta(ej: ?version=5)
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
  }
 }

   @Get(':id')//Ruta dinámica: /cats/123
   findOne(@Param('id') id:string): string{
    //@Param() extrae valores dinámicos de la URL
    //id será "123" si la ruta es /cats/123 token dinámico en la ruta
    return `This action returns a #${id} cat`
   }

  //Decoradores útiles:
  // @Query() → parámetros de consulta.
  // @Param() → parámetros de ruta.
  // @Body() → datos del cuerpo (POST/PUT).
  // @Header() → encabezados personalizados.
  // @Redirect() → redirecciones. 
}
 
  @Controller({host: 'admin.example.com'})//Solo responde a ese host exacto
 //Solo acepta solicitudes cuyo Host sea exactamente admin.example.com
  export class AdminController{
    @Get() //GET /
    index(): string{
      return 'Admin page';//Respuesta solo si el host coincide
    }
  }


