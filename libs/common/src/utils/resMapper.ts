import { plainToInstance } from 'class-transformer';

export const resMapper = (dto: any, data: any) => {
  return plainToInstance(dto, data, {
    excludeExtraneousValues: true,
  });
};
