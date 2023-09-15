import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Contact } from './schemas/contact.schema';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>
  ) {}

  public async findAll(): Promise<Contact[]> {
    const contacts = await this.contactModel.find();

    return contacts;
  }

  public async findAllByQuery(query: UpdateContactDto): Promise<Contact[]> {
    const contacts = await this.contactModel.find({ ...query });

    return contacts;
  }

  public async create(dto: CreateContactDto): Promise<Contact> {
    const createdContact = await new this.contactModel(dto).save();

    return createdContact;
  }

  public async update(id: string, dto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactModel.findById(id);

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    const updatedContact = await this.contactModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('coords');

    return updatedContact;
  }

  public async remove(id: string): Promise<Contact> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const contact = await this.contactModel.findByIdAndDelete(id);

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    return contact;
  }
}
