import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, ROLES_KEY, RolesMetadata } from '../decorators';
import { TokenPayload } from 'apps/auth-services/src/auth/interfaces/token-payload.interface';
import {
  ALLOW_ROLES_KEY,
  AllowRolesMetadata,
} from '../decorators/allow-roles.decorator';

@Injectable()
export class AuthorizeUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Skip guard if route is marked @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const allowRoles = this.reflector.getAllAndOverride<
      AllowRolesMetadata<string>
    >(ALLOW_ROLES_KEY, [context.getHandler(), context.getClass()]);

    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenPayload;

    if (!user) return false;
    if (allowRoles) {
      const hasRole = allowRoles.roles.includes(user.role);
      if (hasRole) return true; // Skip guard if user has role
    }

    const targetUserId =
      request.params?.id || request.query?.id || request.body?.id;
    if (!targetUserId) return true;

    if (user.userId !== targetUserId) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }

    return true;
  }
}
