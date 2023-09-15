import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { ContactsService } from './contacts.service';

import { Contact } from './schemas/contact.schema';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.contacts)
@Controller(ROUTES.contacts)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'find all active Contacts' })
  @ApiResponse({ status: 200, type: Contact, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveContacts() {
    return await this.contactsService.findAllByQuery({ isActive: true });
  }

  @ApiOperation({ summary: 'find all Contacts' })
  @ApiResponse({ status: 200, type: Contact, isArray: true })
  @Get('/all')
  public async findAll() {
    return await this.contactsService.findAll();
  }

  @ApiOperation({ summary: 'create new Contact' })
  @ApiResponse({ status: 200, type: Contact })
  @Post('')
  public async create(@Body() dto: CreateContactDto) {
    return await this.contactsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Contact by ID' })
  @ApiResponse({ status: 200, type: Contact })
  @ApiResponse({ status: 404, description: 'Contact was not found' })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return await this.contactsService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently Contact by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Contact was not found' })
  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    await this.contactsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
