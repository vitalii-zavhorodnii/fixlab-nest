import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateIconBrandDto } from './dto/update-icon-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {}

  public async findAll(): Promise<Brand[]> {
    return await this.brandModel.find();
  }

  public async findAllByQuery(query: UpdateBrandDto): Promise<Brand[]> {
    return await this.brandModel.find(query);
  }

  public async findOneByQuery(query: UpdateBrandDto): Promise<Brand> {
    return await this.brandModel.findOne(query);
  }

  public async findOneById(id: string): Promise<Brand> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const brand = await this.brandModel.findById(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return brand;
  }

  public async findAllByIds(ids: string[]) {
    const objectIds = ids.map((value) => new Types.ObjectId(value));

    const brands = await this.brandModel.find({
      _id: { $in: objectIds }
    });

    return brands;
  }

  public async create(dto: CreateBrandDto): Promise<Brand> {
    const foundBrand = await this.brandModel.findOne({ slug: dto.slug });

    if (foundBrand) {
      throw new BadRequestException(`Brand with slug "${dto.slug}" already exists`);
    }

    const createdBrand = await new this.brandModel(dto).save();
    const brand = await this.findOneById(createdBrand._id);

    return brand;
  }

  public async update(id: string, dto: UpdateBrandDto): Promise<Brand> {
    await this.findOneById(id);

    const brand = await this.brandModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return brand;
  }

  public async updateIcon(id: string, dto: UpdateIconBrandDto): Promise<Brand> {
    await this.findOneById(id);

    const brand = await this.brandModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return brand;
  }

  public async remove(id: string): Promise<Brand> {
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
