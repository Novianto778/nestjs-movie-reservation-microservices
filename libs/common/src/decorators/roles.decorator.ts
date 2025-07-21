import { SetMetadata } from '@nestjs/common';

export interface RolesMetadata<T> {
  roles: T[];
  message?: string;
}

export const ROLES_KEY = 'roles';

export const Roles = <T>(roles: T[], message?: string) =>
  SetMetadata(ROLES_KEY, {
    roles,
    message,
  });
