import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Header,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ISuccessDelete } from 'shared/interfaces/success-delete.interface';

import { ImagesService } from './images.service';

import { Image } from './schemas/image.schema';

import { FileStorageHelper } from 'helpers/file-storage.helper';

import { AddImageDto } from './dto/add-image.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.images)
@Controller(ROUTES.images)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'get all images, auth reqiured*' })
  @ApiResponse({ status: 200, type: Image, isArray: true })
  @Get('/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'posts 0-24/319')
  public async findAllImages(): Promise<Image[]> {
    return await this.imagesService.findAll();
  }

  // @ApiOperation({ summary: 'get Icons data, auth reqiured*' })
  // @ApiResponse({ status: 200, type: Image, isArray: true })
  // @Get('/icons')
  // @Header('Access-Control-Expose-Headers', 'Content-Range')
  // @Header('Content-Range', 'posts 0-24/319')
  // public async findAllIconsTest(): Promise<Image[]> {
  //   return await this.imagesService.findAllByType({ type: 'icon' });
  // }

  @ApiOperation({ summary: 'get Icons data, auth reqiured*' })
  @ApiResponse({ status: 200, type: Image, isArray: true })
  @Get('/icons/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'posts 0-24/319')
  public async findAllIcons(): Promise<Image[]> {
    return await this.imagesService.findAllByType({ type: 'icon' });
  }

  @ApiOperation({ summary: 'get Images data, auth reqiured*' })
  @ApiResponse({ status: 200, type: Image, isArray: true })
  @Get('/pictures/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'posts 0-24/319')
  public async findAllPictures(): Promise<Image[]> {
    return await this.imagesService.findAllByType({ type: 'picture' });
  }

  @ApiOperation({
    summary: 'upload icon image'
  })
  @Post('/upload-icon')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('icons')
    })
  )
  public async uploadIcon(
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    file: Express.Multer.File
  ): Promise<Image> {
    const filePath = `${process.env.SERVER_URL}/${file.path}`;

    const pictureData = {
      file: file,
      src: filePath,
      alt: body.alt,
      type: body.type
    };

    const imageData = await this.imagesService.add(pictureData);

    return imageData;
  }

  @ApiOperation({
    summary: 'upload picture image'
  })
  @Post('/upload-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('pictures')
    })
  )
  public async uploadPicture(
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        // validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    file: Express.Multer.File
  ): Promise<Image> {
    const filePath = `${process.env.SERVER_URL}/${file.path}`;

    const pictureData = {
      file: file,
      src: filePath,
      alt: body.alt,
      type: body.type
    };

    const imageData = await this.imagesService.add(pictureData);

    return imageData;
  }

  @Put('/icons/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('icons')
    })
  )
  public async updateIcon(
    @Param('id') id: string,
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    file: Express.Multer.File
  ): Promise<Image> {
    const filePath = `${process.env.SERVER_URL}/${file.path}`;
    const pictureData = {
      file: file,
      src: filePath,
      alt: body.alt,
      type: body.type
    };
    const updatedImageData = await this.imagesService.update(id, pictureData);

    return updatedImageData;
  }

  @Put('/pictures/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('pictures')
    })
  )
  public async updatePicture(
    @Param('id') id: string,
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        // validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })]
      })
    )
    file: Express.Multer.File
  ): Promise<Image> {
    const filePath = `${process.env.SERVER_URL}/${file.path}`;
    const pictureData = {
      file: file,
      src: filePath,
      alt: body.alt,
      type: body.type
    };
    const updatedImageData = await this.imagesService.update(id, pictureData);

    return updatedImageData;
  }

  @ApiOperation({ summary: 'get Image data by ID, auth reqiured*' })
  @ApiResponse({ status: 200, type: Image })
  @ApiResponse({ status: 404, description: 'Image was not found' })
  @Get('/:id')
  public async findImageById(@Param('id') id: string): Promise<Image> {
    return await this.imagesService.findOneById(id);
  }

  @ApiOperation({ summary: 'remove permanently Image by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Image was not found' })
  @Delete('/:id')
  public async removeImage(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.imagesService.remove(id);

    return { status: 204, result: 'success' };
  }
}
