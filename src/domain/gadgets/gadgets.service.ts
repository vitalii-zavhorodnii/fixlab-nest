import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Gadget } from './schemas/gadget.schema';

import { CreateGadgetDto } from './dto/create-gadget.dto';

@Injectable()
export class GadgetsService {
  constructor(@InjectModel(Gadget.name) private gadgetModel: Model<Gadget>) {}

  public async getAll(): Promise<Gadget[]> {
    return await this.gadgetModel.find({
      where: { isActive: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  public async create(dto: CreateGadgetDto): Promise<Gadget> {
    const gadget = await new this.gadgetModel(dto);

    return gadget.save();
  }
}
