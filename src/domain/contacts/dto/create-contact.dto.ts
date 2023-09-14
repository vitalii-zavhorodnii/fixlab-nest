import { UpdateBrandDto } from 'domain/brands/dto/update-brand.dto';

export class CreateContactDto extends UpdateBrandDto {
  area: string;
  isActive: boolean;
  address: string;
}
