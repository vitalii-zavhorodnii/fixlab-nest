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
import { Public } from 'decorators/public.decorator';
import { Response } from 'express';

import { ISuccessDelete } from 'shared/interfaces/success-delete.interface';

import { ContactsService } from './contacts.service';

import { Contact } from './schemas/contact.schema';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.contacts)
@Controller(ROUTES.contacts)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'public, find all active contacts' })
  @ApiResponse({ status: 200, type: Contact, isArray: true })
  @Public()
  @Get('')
  public async findActiveContacts(): Promise<Contact[]> {
    return await this.contactsService.findActive();
  }

  @ApiOperation({ summary: 'find all contacts' })
  @ApiResponse({ status: 200, type: Contact, isArray: true })
  @Get('/all')
  public async findAllContacts(@Res() response: Response): Promise<void> {
    const result: Contact[] = await this.contactsService.findAll();

    response.header('Content-Range', `contacts ${result.length}`);
    response.send(result);
  }

  @ApiOperation({ summary: 'create new contact' })
  @ApiResponse({ status: 200, type: Contact })
  @Post('')
  public async createContact(@Body() dto: CreateContactDto): Promise<Contact> {
    return await this.contactsService.create(dto);
  }

  @ApiOperation({ summary: 'get contact data by ID' })
  @ApiResponse({ status: 200, type: Contact })
  @ApiResponse({ status: 404, description: 'Contact was not found' })
  @Get('/:id')
  public async findBrandById(@Param('id') id: string): Promise<Contact> {
    return await this.contactsService.findOneById(id);
  }

  @ApiOperation({ summary: 'update existing contact by ID' })
  @ApiResponse({ status: 200, type: Contact })
  @ApiResponse({ status: 404, description: 'Contact was not found' })
  @Put('/:id')
  public async updateContact(
    @Param('id') id: string,
    @Body() dto: UpdateContactDto
  ): Promise<Contact | null> {
    return await this.contactsService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently contact by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Contact was not found' })
  @Delete('/:id')
  public async removeContact(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.contactsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
