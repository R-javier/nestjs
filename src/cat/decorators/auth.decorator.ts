import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export type Role = 'admin' | 'user' | 'moderator';


export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(/* AuthGuard('jwt'), RolesGuard */),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

