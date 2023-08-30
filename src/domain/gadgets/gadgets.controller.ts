import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';
import { CreateGadgetDto } from './dto/create-gadget.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.gadgets)
@Controller(ROUTES.gadgets)
export class GadgetsController {
  constructor(private service: GadgetsService) {}

  @ApiOperation({ summary: 'get all gadgets' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Get('')
  public async getAllGadgets() {
    return await this.service.getAll();
  }

  @ApiOperation({ summary: 'create new gadget' })
  @ApiResponse({ status: 200, type: Gadget })
  @Post('')
  public async createGadget(dto: CreateGadgetDto) {}
}
