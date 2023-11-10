import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {}

  public async findAll(): Promise<Brand[]> {
    return await this.brandModel.find().populate({ path: 'icon' });
  }

  public async findActive(): Promise<Brand[]> {
    return await this.brandModel.find({ isActive: true }).populate({ path: 'icon' });
  }

  public async findOneByQuery(query: UpdateBrandDto): Promise<Brand | null> {
    return await this.brandModel.findOne(query).populate({ path: 'icon' });
  }

  public async findOneById(id: string): Promise<Brand> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const brand = await this.brandModel.findById(id).populate({ path: 'icon' });

    if (!brand) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return brand;
  }

  public async findAllByIds(ids: string[]): Promise<Brand[]> {
    const objectIds = ids.map((value) => new Types.ObjectId(value));

    const brands = await this.brandModel
      .find({
        _id: { $in: objectIds }
      })
      .populate({ path: 'icon' });

    return brands;
  }

  public async create(dto: CreateBrandDto): Promise<Brand> {
    const foundBrand = await this.brandModel.findOne({ slug: dto.slug });

    if (foundBrand) {
      throw new UnprocessableEntityException(
        `Brand with slug "${dto.slug}" already exists`
      );
    }

    const createdBrand = await new this.brandModel(dto).save();
    const brand = await this.findOneById(createdBrand._id);

    return brand;
  }

  public async update(id: string, dto: UpdateBrandDto): Promise<Brand | null> {
    await this.findOneById(id);

    const brand = await this.brandModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate({ path: 'icon' });

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
