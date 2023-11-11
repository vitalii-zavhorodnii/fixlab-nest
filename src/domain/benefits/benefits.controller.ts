import { Public } from '@decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response as Res
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { BenefitsService } from './benefits.service';

import { Benefit } from './schemas/benefit.schema';

import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.benefits)
@Controller(ROUTES.benefits)
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @ApiOperation({ summary: 'public, get all active benefits' })
  @ApiResponse({ status: 200, type: Benefit, isArray: true })
  @Public()
  @Get('')
  public async findActiveBenefits(): Promise<Benefit[]> {
    return await this.benefitsService.findActive();
  }

  @ApiOperation({ summary: 'get benefits data' })
  @ApiResponse({ status: 200, type: Benefit, isArray: true })
  @Get('/all')
  public async findAllBenefits(@Res() response: Response): Promise<void> {
    const result: Benefit[] = await this.benefitsService.findAll();

    response.header('Content-Range', `benefits ${result.length}`);
    response.send(result);
  }

  @ApiOperation({ summary: 'get benefit data by ID' })
  @ApiResponse({ status: 200, type: Benefit })
  @ApiResponse({ status: 404, description: 'Benefits was not found' })
  @Get('/:id')
  public async findBenefitById(@Param('id') id: string): Promise<Benefit> {
    return await this.benefitsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new benefit' })
  @ApiResponse({ status: 200, type: Benefit })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createBenefit(
    @Body()
    dto: CreateBenefitDto
  ): Promise<Benefit> {
    return await this.benefitsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing benefit by ID' })
  @ApiResponse({ status: 200, type: Benefit })
  @ApiResponse({ status: 404, description: 'Benefit was not found' })
  @Put('/:id')
  public async updateBenefit(
    @Param('id') id: string,
    @Body()
    dto: UpdateBenefitDto
  ): Promise<Benefit | null> {
    return await this.benefitsService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently benefit by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Benefit was not found' })
  @Delete('/:id')
  public async removeBenefit(@Param('id') id: string): Promise<void> {
    await this.benefitsService.remove(id);
  }
}
