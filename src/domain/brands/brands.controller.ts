import {
  Controller,
  UsePipes,
  Param,
  UploadedFile,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Brand } from './schemas/brand.schema';
import { BrandsService } from './brands.service';

import { fileStorageHelper } from 'helpers/file-storage.helper';
import { CreateBrandDto } from './dto/create-brand.dto';

import { ROUTES, SERVE_FOLDER } from 'constants/routes.constants';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags(ROUTES.brands)
@Controller(ROUTES.brands)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'get all brands' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Get('')
  public async getAllBrands() {
    return await this.brandsService.getAll();
  }

  @ApiOperation({ summary: 'get gadget by ID' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brands was not found' })
  @Get('/:id')
  public async getBrandById(@Param('id') id: string) {
    return await this.brandsService.getById(id);
  }

  @ApiOperation({ summary: 'create new brand' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createBrand(
    @Body()
    dto: CreateBrandDto,
  ) {
    const brand = await this.brandsService.create(dto);

    return brand;
  }

  @ApiOperation({ summary: 'update existing brand' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Put('/:id')
  public async updateBrand(
    @Param('id') id: string,
    @Body()
    dto: UpdateBrandDto,
  ) {
    const brand = await this.brandsService.update(id, dto);

    return brand;
  }

  @ApiOperation({ summary: 'upload svg image' })
  @UseInterceptors(
    FileInterceptor('image', { storage: fileStorageHelper(ROUTES.brands) }),
  )
  @Put('/:id/update-image')
  public async updateBrandImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })],
      }),
    )
    icon: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const filePath = `/${SERVE_FOLDER}/${ROUTES.brands}/${icon.filename}`;

    await this.brandsService.update(id, { icon: filePath });

    return filePath;
  }

  @ApiOperation({ summary: 'remove permanently brand' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Delete('/:id')
  public async deleteBrand(@Param('id') id: string) {
    const deletedBrand = await this.brandsService.delete(id);

    return deletedBrand;
  }

  @ApiOperation({ summary: 'get brand by slug' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Get('get-by-slug/:slug')
  public async getBySlug(@Param('slug') slug: string) {
    return await this.brandsService.getOneByQuery({ slug });
  }
}
