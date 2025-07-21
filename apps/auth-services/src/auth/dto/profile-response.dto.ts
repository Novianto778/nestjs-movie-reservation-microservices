import { Expose } from 'class-transformer';

export class ProfileResponseDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  role: string;
}
