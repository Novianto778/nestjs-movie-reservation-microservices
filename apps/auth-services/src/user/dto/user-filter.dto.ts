import { PaginationDto } from '@app/common/dto/pagination.dto';

export class UserFilterDto extends PaginationDto {
  search?: string;
}
