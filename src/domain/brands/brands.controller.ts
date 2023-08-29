import {
  Controller,
  UsePipes,
  Param,
  UploadedFile,
  Body,
  Get,
  Post,
  Delete,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BrandsService } from './brands.service';
import { DtoValidationPipe } from 'pipes/dto-validation.pipe';

import { fileStorageHelper } from 'helpers/file-storage.helper';
import { CreateBrandDto } from './dto/create-brand.dto';

import { ROUTES, SERVE_FOLDER } from 'constants/routes';

@Controller(ROUTES.brands)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('')
  public async getAllBrands() {
    return await this.brandsService.getAll();
  }

  @Get('/:id')
  public async getBrandById(@Param('id') id: string) {
    return await this.brandsService.getById(id);
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('image', { storage: fileStorageHelper(ROUTES.brands) }),
  )
  @UsePipes(DtoValidationPipe)
  public async createBrand(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })],
      }),
    )
    image: Express.Multer.File,
    @Body()
    dto: CreateBrandDto,
  ) {
    const filePath = `/${SERVE_FOLDER}/${ROUTES.brands}/${image.filename}`;
    const brand = await this.brandsService.create(dto, filePath);

    return brand;
  }

  @Delete('/:id')
  public async deleteBrand(@Param('id') id: string) {
    const deletedBrand = await this.brandsService.delete(id);

    return deletedBrand;
  }
}
