import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Gadget } from './schemas/gadget.schema';

import { CreateGadgetDto } from './dto/create-gadget.dto';
import { UpdateGadgetDto } from './dto/update-gadget.dto';

@Injectable()
export class GadgetsService {
  constructor(
    @InjectModel(Gadget.name) private readonly gadgetModel: Model<Gadget>
  ) {}

  public async findAll(): Promise<Gadget[]> {
    return await this.gadgetModel.find();
  }

  public async findAllByQuery(query: UpdateGadgetDto): Promise<Gadget[]> {
    return await this.gadgetModel.find(query);
  }

  public async findOneByQuery(query: UpdateGadgetDto): Promise<Gadget[]> {
    return await this.gadgetModel.findOne(query);
  }

  public async findOneById(id: string): Promise<Gadget> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const gadget = await this.gadgetModel.findById(id);

    if (!gadget) {
      throw new NotFoundException(`Gadget with ID "${id}" was not found`);
    }

    return gadget;
  }

  public async create(dto: CreateGadgetDto): Promise<Gadget> {
    const foundGadget = await this.gadgetModel.findOne({ slug: dto.slug });

    if (foundGadget) {
      throw new BadRequestException(
        `Gadget with slug "${dto.slug}" already exists`
      );
    }

    const createdGadget = await new this.gadgetModel(dto).save();
    const gadget = await this.findOneById(createdGadget._id);

    return gadget;
  }

  public async update(id: string, dto: UpdateGadgetDto): Promise<Gadget> {
    await this.findOneById(id);

    const updatedGadget = await this.gadgetModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('brands');

    return updatedGadget;
  }

  public async remove(id: string): Promise<Gadget> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const gadget = await this.gadgetModel.findByIdAndDelete(id);

    if (!gadget) {
      throw new NotFoundException(`Gadget with ID ${id} was not found`);
    }

    return gadget;
  }
}
