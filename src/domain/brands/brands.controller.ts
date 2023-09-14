import {
  Controller,
  Param,
  UploadedFile,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

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

  @ApiOperation({ summary: 'Client: get all active brands' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveBrands() {
    return await this.brandsService.findByQuery({ isActive: true });
  }

  @ApiOperation({ summary: 'Client: get brand by slug' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string) {
    return await this.brandsService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'get Brands data, auth reqiured*' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Get('/all')
  public async findAllBrands() {
    return await this.brandsService.findAll();
  }

  @ApiOperation({ summary: 'get Brand data by ID, auth reqiured*' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brands was not found' })
  @Get('/:id')
  public async findBrandById(@Param('id') id: string) {
    return await this.brandsService.findById(id);
  }

  @ApiOperation({ summary: 'create new Brand' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createBrand(
    @Body()
    dto: CreateBrandDto,
  ) {
    return await this.brandsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Brand by ID' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Patch('/:id')
  public async updateBrand(
    @Param('id') id: string,
    @Body()
    dto: UpdateBrandDto,
  ) {
    return await this.brandsService.update(id, dto);
  }

  @ApiOperation({ summary: 'upload svg image for Brand by ID' })
  @UseInterceptors(
    FileInterceptor('icon', { storage: FileStorageHelper(ROUTES.brands) }),
  )
  @Patch('/:id/update-icon')
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

  @ApiOperation({ summary: 'remove permanently Brand by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Delete('/:id')
  public async deleteBrand(@Param('id') id: string) {
    await this.brandsService.delete(id);

    return { status: 204, result: 'success' };
  }
}
