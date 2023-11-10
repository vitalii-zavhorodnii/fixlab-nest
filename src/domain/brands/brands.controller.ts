import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Response as Res
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';
import { Response } from 'express';

import { ISuccessDelete } from 'shared/interfaces/success-delete.interface';

import { BrandsService } from './brands.service';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.brands)
@Controller(ROUTES.brands)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'piblic, get all active brands' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Public()
  @Get('')
  public async findActiveBrands(): Promise<Brand[]> {
    return await this.brandsService.findActive();
  }

  @ApiOperation({ summary: 'public, get brand by slug' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Brand with slug was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBrandBySlug(@Param('slug') slug: string): Promise<Brand> {
    const result = await this.brandsService.findOneByQuery({ slug });

    if (!result) {
      throw new NotFoundException(`Brand with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get brands data' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Get('/all')
  public async findAllBrands(@Res() response: Response): Promise<void> {
    const result: Brand[] = await this.brandsService.findAll();

    response.header('Content-Range', `brands ${result.length}`);
    response.send(result);
  }

  @ApiOperation({ summary: 'get brand data by ID' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brands was not found' })
  @Get('/:id')
  public async findBrandById(@Param('id') id: string): Promise<Brand> {
    return await this.brandsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new brand' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 422, description: 'Slug is already exists' })
  @Post('')
  public async createBrand(
    @Body()
    dto: CreateBrandDto
  ): Promise<Brand> {
    return await this.brandsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing brand by ID' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Put('/:id')
  public async updateBrand(
    @Param('id') id: string,
    @Body()
    dto: UpdateBrandDto
  ): Promise<Brand | null> {
    return await this.brandsService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently brand by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Delete('/:id')
  public async removeBrand(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.brandsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
