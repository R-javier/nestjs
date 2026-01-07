import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}


  // Implementación mínima para que compile mientras sigo la guía
  function validateRequest(_request: any): boolean {
    // Por ahora permitimos todo ya que la guía solo es conceptual en este punto
    return true;
  }
