import { UpdateBrandDto } from './update-brand.dto';

export class CreateBrandDto extends UpdateBrandDto {
  readonly title: string;
  readonly slug: string;
}