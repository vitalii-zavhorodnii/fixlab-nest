import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  public async getAll(): Promise<Brand[]> {
    return await this.brandModel.find().select('-__v');
  }

  public async getByQuery(query: UpdateBrandDto): Promise<Brand[]> {
    return await this.brandModel.find(query).select('-__v');
  }

  public async getOneByQuery(query: UpdateBrandDto): Promise<Brand> {
    return await this.brandModel.findOne(query).select('-__v');
  }

  public async getBySlug(slug: string): Promise<Brand> {
    const brand = await this.brandModel.findOne({ slug }).select('-__v');

    if (!brand) {
      throw new NotFoundException(`Brand with slug "${slug}" was not found`);
    }

    return brand;
  }

  public async getById(id: string): Promise<Brand> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const brand = await this.brandModel.findById(id).select('-__v');

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

    const createdBrand = await new this.brandModel(dto).save();
    const brand = await this.getById(createdBrand.id);

    return brand;
  }

  public async update(id: string, dto: UpdateBrandDto): Promise<Brand> {
    const foundBrand = await this.getById(id);

    if (!foundBrand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    const brand = await this.brandModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    return brand;
  }

  public async delete(id: string): Promise<Brand> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const brand = await this.brandModel.findByIdAndDelete(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return brand;
  }
}
