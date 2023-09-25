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

import { ISuccessDelete } from 'interfaces/success-delete.interface';

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';

import { FileStorageHelper } from 'helpers/file-storage.helper';

import { CreateGadgetDto } from './dto/create-gadget.dto';
import { RelateBrandToGadgetDto } from './dto/relate-brand-to-gadget.dto';
import { UpdateGadgetDto } from './dto/update-gadget.dto';

import { PUBLIC_FOLDER, ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.gadgets)
@Controller(ROUTES.gadgets)
export class GadgetsController {
  constructor(private readonly gadetsService: GadgetsService) {}

  @ApiOperation({ summary: 'No-auth* get all Gadgets' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveGadgets(): Promise<Gadget[]> {
    return await this.gadetsService.findAllActive();
  }

  @ApiOperation({ summary: 'No-auth* get Gadget by slug' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Gadget> {
    const result = await this.gadetsService.findOneByQuery({
      slug
    });

    if (!result) {
      throw new NotFoundException(`Gadget with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get all Gadets data' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Get('/all')
  public async findAllGadgets(): Promise<Gadget[]> {
    return await this.gadetsService.findAll();
  }

  @ApiOperation({ summary: 'get Gadget data by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Get('/:id')
  public async findGadgetById(@Param('id') id: string): Promise<Gadget> {
    return await this.gadetsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new Gadget' })
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

  @ApiOperation({ summary: 'update existing Gadget by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.update(id, dto);
  }

  @ApiOperation({ summary: 'update existing Gadget by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Patch('/:id')
  public async updateGadget(
    @Param('id') id: string,
    @Body()
    dto: UpdateGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'update Brands of Gadget by ID'
  })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @ApiResponse({
    status: 404,
    description: 'Brand was not found'
  })
  @Patch('/:id/brands')
  public async addBrands(
    @Param('id') id: string,
    @Body() { brandIds }: RelateBrandToGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.updateBrandsGadget(id, brandIds);
  }

  @ApiOperation({
    summary: 'update Brands of Gadget by ID'
  })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @ApiResponse({
    status: 404,
    description: 'Brand was not found'
  })
  @Patch('/:gadgetId/add-issue/:issueId')
  public async addIssueToGadget(
    @Param('gadgetId') gadgetId: string,
    @Param('issueId') issueId: string
  ): Promise<Gadget> {
    return await this.gadetsService.updateIssueGadget(gadgetId, issueId, 'push');
  }

  @ApiOperation({
    summary: 'update Brands of Gadget by ID'
  })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Patch('/:id/remove-issue/:issueId')
  public async removeIssueToGadget(
    @Param('id') id: string,
    @Param('issueId') issueId: string
  ): Promise<Gadget> {
    return await this.gadetsService.updateIssueGadget(id, issueId, 'pull');
  }

  @ApiOperation({
    summary: 'upload svg image for Gadget by ID'
  })
  @UseInterceptors(
    FileInterceptor('gadgets', {
      storage: FileStorageHelper(ROUTES.gadgets)
    })
  )
  @Patch('/:id/update-image')
  public async updateBrandIcon(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    image: Express.Multer.File
  ): Promise<string> {
    const filePath = `/${PUBLIC_FOLDER}/${ROUTES.brands}/${image.filename}`;

    await this.gadetsService.updateImages(id, {
      image: filePath
    });

    return filePath;
  }

  @ApiOperation({
    summary: 'upload svg image for Gadget by ID'
  })
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: FileStorageHelper(ROUTES.gadgets)
    })
  )
  @Patch('/:id/update-icon')
  public async updateGadgetIcon(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    icon: Express.Multer.File
  ): Promise<string> {
    const filePath = `/${PUBLIC_FOLDER}/${ROUTES.gadgets}/${icon.filename}`;

    await this.gadetsService.updateImages(id, {
      icon: filePath
    });

    return filePath;
  }

  @ApiOperation({
    summary: 'remove permanently Gadget by ID'
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
