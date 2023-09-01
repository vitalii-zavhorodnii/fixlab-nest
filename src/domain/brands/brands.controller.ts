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

import { FileStorageHelper } from 'helpers/file-storage.helper';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { ROUTES, SERVE_FOLDER } from 'constants/routes.constants';

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
    return await this.brandsService.create(dto);
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
    return await this.brandsService.update(id, dto);
  }

  @ApiOperation({ summary: 'upload svg image' })
  @UseInterceptors(
    FileInterceptor('icon', { storage: FileStorageHelper(ROUTES.brands) }),
  )
  @Put('/:id/update-icon')
  public async updateBrandIcon(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })],
      }),
    )
    icon: Express.Multer.File,
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
    await this.brandsService.delete(id);

    return { status: 204, result: 'success' };
  }

  @ApiOperation({ summary: 'get brand by slug' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Get('get-by-slug/:slug')
  public async getBySlug(@Param('slug') slug: string) {
    return await this.brandsService.getBySlug(slug);
  }
}
