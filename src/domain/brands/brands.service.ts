import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  public async getAll(): Promise<Brand[]> {
    const allBrands = await this.brandModel.find().select('-__v');

    return allBrands;
  }

  public async getByQuery(query: UpdateBrandDto): Promise<Brand[]> {
    const brand = await this.brandModel.find(query).select('-__v');

    return brand;
  }

  public async getOneByQuery(query: UpdateBrandDto): Promise<Brand> {
    return await this.brandModel.findOne(query).select('-__v');
  }

  public async getById(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return brand;
  }

  public async create(dto: CreateBrandDto): Promise<Brand> {
    const foundBrand = await this.brandModel.findOne({ slug: dto.slug });

    if (foundBrand) {
      throw new BadRequestException(
        `Brand with slug "${dto.slug}" already exists`,
      );
    }

    const brand = await new this.brandModel(dto);

    return brand.save();
  }

  public async update(id: string, dto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return brand;
  }

  public async delete(id: string): Promise<Brand> {
    const brand = await this.brandModel.findByIdAndDelete(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return brand;
  }
}
