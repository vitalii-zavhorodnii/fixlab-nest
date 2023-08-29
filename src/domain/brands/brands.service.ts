import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  public async getAll(): Promise<Brand[]> {
    return await this.brandModel.find({
      where: { isActive: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  public async getById(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return brand;
  }

  public async create(dto: CreateBrandDto): Promise<Brand> {
    const brand = await new this.brandModel(dto);

    return brand.save();
  }

  public async delete(id: string): Promise<Brand> {
    const brand = await this.brandModel.findByIdAndDelete(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return brand;
  }
}
