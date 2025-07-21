import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, ROLES_KEY, RolesMetadata } from '../decorators';

@Injectable()
export class RolesGuard<T> implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Skip guard if route is marked @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const metadata = this.reflector.getAllAndOverride<RolesMetadata<T>>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const { roles, message } = metadata;
    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const hasRole = roles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        message || 'You are not authorized to access this resource',
      );
    }

    return true;
  }
}
