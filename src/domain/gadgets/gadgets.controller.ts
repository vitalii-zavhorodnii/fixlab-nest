import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';
import { CreateGadgetDto } from './dto/create-gadget.dto';

@Controller('gadgets')
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
