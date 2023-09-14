import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';

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
}
