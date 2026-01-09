import { Controller, Get, Post, Body, Redirect, Query, Param, UseFilters, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, UseInterceptors} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './providers/cat.interfaces'

import { User } from "./decorators/user.decorator" //importamos el decorador


//importamos el filtro local para este controlador
import { HttpExceptionFilter } from './filters/http-exception.filter';

//importamos la excepción con alias para no chocar con la de Nest
import { ForbiddenException as MyForbiddenException} from './exceptions/forbidden.exception';

//IMPORTS para zod
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createCatSchema, CreateCatDtoZod } from './schemas/create-cat.schema';

import { RolesGuard } from './guards/roles.guard';
// Tengo importado CatchEverythingFilter por si quiero usarlo localmente
// import { CatchEverythingFilter } from './filters/catch-everything.filter';
import { Roles } from './guards/roles.decorator';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


import { Auth } from './decorators/auth.decorator'

type UserEntity = {
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  roles:string[];
}

// @UseInterceptors(LoggingInterceptor) 
@UseInterceptors(new LoggingInterceptor())



@Controller('cats') // Ruta base: /cats
//Si queremos que el filtro aplique a TODAS las rutas de /cats:
@UseGuards(RolesGuard) //Agregamos el UseGuards
@UseFilters(HttpExceptionFilter)//Filtros de excepción De manera local en este ejemplo
export class CatController {
  constructor(private readonly catService: CatService){}
  // @Post()// el status code predeterminado para respuestas siempre es 200(OK Operación exitosa).
  //EXCEPTO para solicitudes POST cuyo valor es 201(Recurso creado correctamente).
  // @HttpCode(204)//Operación exitosa - No content

  //ejemplo 1 
  @Get('me')
  getCurrentUser(@User() user: UserEntity){
    console.log(user);
    return user;
  }

  //ejemplo 2 uso en controlador 
  @Get('hello')
  helloCurrentUser(@User('firstName') firstName: string){
    console.log(`Hello ${firstName}`);
    return { greeting: `Hello ${firstName}` };
  }

  //ejemplo 3 aplicar el pipe directamente en el handler
  @Get('validated-user')
  async validatedUser(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
  ) {
  console.log(user);
  return user;
  }

  //ejemplo 4 con Auth.decorator
  @Get('users')
  @Auth('admin')
  findAllUsers() {
  return [];
}


  @Post()
  @Roles(['admin']) //lo agregamos
  //@UseFilters(HttpExceptionFilter) //Aplicamos SOLO a este método, lo comento porque ahora se encarga el local
  // @Header('Cache-Control', 'no-store') //Encabezados de respuesta 
  //No guardar nada en caché 
  //Evita que cliente o proxies almacenen la respuesta en caché.
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto){
    //createCatDto ya viene validado y con tipos correctos por Zod
    
    //Forzamos la excepción para probar el filtro y ver el JSON
    // try{
    //   this.catService.create(createCatDto);
    // return createCatDto;
    // }catch(error){
    //   throw new MyForbiddenException('No puedes crear gatos ahora');
    // }
   
    //Con esto probamos en POSTAMAN Y VEMOS EL MENSAJE DE ERROR!
    // throw new MyForbiddenException('No puedes crear gatos ahora')

    //En código real, sería:
    return this.catService.create(createCatDto);
  }

 
  // @Get() // Maneja GET /cats
  // @Redirect('https://nestjs.com', 301) //'URL direccion a la que el cliente será redirigido'
 //statusCode 301- redirección permanente.
 @Get()
  async findAll(): Promise<Cat[]>{
   // Acá tenés acceso a todo lo que viene en la solicitud
   // request.(headers, params, query, body, cookies, ip, etc.)
   // Usar nombres claros y semánticos.

  
   //    try{
   //     return await this.catService.findAll();
   //    }catch(error){
   //     //Lanzamos excepción de Nest directamente
   //     throw new MyForbiddenException('No tienes permisos para ver los gatos');
   //  }

   //Controller limpio; si el service lanza, el filtro(si está aplicado)
   //Formateará la respuesta.

   return this.catService.findAll()
  }

 @Get('abcd/*wildcard')//El controlador tiene base @Controller('cats'), así que todas las rutas empiezan con /cats.
 //El segmento abcd/*wildcard significa: coincide con cualquier cosa después de /cats/abcd/.
 //ejemplo de url http://localhost:3000/cats/abcd/cat
 findWildcard(){
  return 'This route uses a wildcard'
 }


  // @Get()
  // async findByAgeAndBreed(@Query('age') age?: number, @Query('breed') breed?: string) {
  //   return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  // }


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
   findOne(@Param('id', new ParseIntPipe()) id:number){ //Agregamos ParseIntPipe luego del 'id'
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


