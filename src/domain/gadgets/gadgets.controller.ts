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

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';

import { CreateGadgetDto } from './dto/create-gadget.dto';
import { UpdateGadgetDto } from './dto/update-gadget.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.gadgets)
@Controller(ROUTES.gadgets)
export class GadgetsController {
  constructor(private readonly gadetsService: GadgetsService) {}

  @ApiOperation({ summary: 'public, get all gadgets' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Public()
  @Get('')
  public async findActiveGadgets(): Promise<Gadget[]> {
    return await this.gadetsService.findActive();
  }

  @ApiOperation({ summary: 'public, get gadget by slug' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findGadgetBySlug(@Param('slug') slug: string): Promise<Gadget> {
    const result = await this.gadetsService.findOneByQuery({
      slug
    });

    if (!result) {
      throw new NotFoundException(`Gadget with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get all gadets data' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Get('/all')
  public async findAllGadgets(@Res() response: Response): Promise<void> {
    const result: Gadget[] = await this.gadetsService.findAll();

    response.header('Content-Range', `gadgets ${result.length}`);
    response.send(result);
  }

  @ApiOperation({ summary: 'get gadget data by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Get('/:id')
  public async findGadgetById(@Param('id') id: string): Promise<Gadget> {
    return await this.gadetsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new gadget' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createGadget(
    @Body()
    dto: CreateGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing gadget by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Put('/:id')
  public async updateGadget(
    @Param('id') id: string,
    @Body() dto: UpdateGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently gadget by ID'
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Delete('/:id')
  public async removeGadget(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.gadetsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
