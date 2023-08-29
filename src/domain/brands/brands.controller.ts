import { Controller, Param, Get, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BrandsService } from './brands.service';

import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('')
  public async getAllBrands() {
    return await this.brandsService.getAll();
  }

  @Get('/:id')
  public async getBrandById(@Param('id') id: string) {
    return await this.brandsService.getById(id);
  }

  @Post('')
  public async createBrand(dto: CreateBrandDto) {
    const brand = await this.brandsService.create(dto);

    return brand;
  }

  @Delete('/:id')
  public async deleteBrand(@Param('id') id: string) {
    const deletedBrand = await this.brandsService.delete(id);

    return deletedBrand;
  }
}
