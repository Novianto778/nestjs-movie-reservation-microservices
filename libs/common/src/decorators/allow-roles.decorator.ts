import { SetMetadata } from '@nestjs/common';

export interface AllowRolesMetadata<T> {
  roles: T[];
}

export const ALLOW_ROLES_KEY = 'allow-roles';

export const AllowRoles = <T>(roles: T[]) =>
  SetMetadata(ALLOW_ROLES_KEY, {
    roles,
  });
