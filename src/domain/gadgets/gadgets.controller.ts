import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  NotFoundException,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';

import { FileStorageHelper } from 'helpers/file-storage.helper';

import { CreateGadgetDto } from './dto/create-gadget.dto';

import { PUBLIC_FOLDER, ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.gadgets)
@Controller(ROUTES.gadgets)
export class GadgetsController {
  constructor(private readonly gadetsService: GadgetsService) {}

  @ApiOperation({ summary: 'get all gadgets' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveGadgets() {
    return await this.gadetsService.findAllByQuery({ isActive: true });
  }

  @ApiOperation({ summary: 'get Gadget by slug' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string) {
    const result = await this.gadetsService.findOneByQuery({ slug });

    if (!result) {
      throw new NotFoundException(`Gadget with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get Gadget data, auth reqiured*' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Get('/all')
  public async findAllGadgets() {
    return await this.gadetsService.findAll();
  }

  @ApiOperation({ summary: 'get Gadget data by ID, auth reqiured*' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({ status: 404, description: 'Gadget was not found' })
  @Get('/:id')
  public async findGadgetById(@Param('id') id: string) {
    return await this.gadetsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new Gadget' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createBrand(
    @Body()
    dto: CreateGadgetDto
  ) {
    return await this.gadetsService.create(dto);
  }

  @ApiOperation({ summary: 'upload svg image for Gadget by ID' })
  @UseInterceptors(
    FileInterceptor('gadgets', { storage: FileStorageHelper(ROUTES.gadgets) })
  )
  @Patch('/:id/update-icon')
  public async updateBrandIcon(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    icon: Express.Multer.File
  ) {
    const filePath = `/${PUBLIC_FOLDER}/${ROUTES.brands}/${icon.filename}`;

    await this.gadetsService.update(id, { icon: filePath });

    return filePath;
  }

  @ApiOperation({ summary: 'remove permanently Gadget by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Gadget was not found' })
  @Delete('/:id')
  public async removeGadget(@Param('id') id: string) {
    await this.gadetsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
