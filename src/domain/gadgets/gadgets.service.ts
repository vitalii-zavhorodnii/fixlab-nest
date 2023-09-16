import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { BrandsService } from 'domain/brands/brands.service';

import { Gadget } from './schemas/gadget.schema';

import { CreateGadgetDto } from './dto/create-gadget.dto';
import { UpdateGadgetDto } from './dto/update-gadget.dto';
import { UpdateImageGadgetDto } from './dto/update-image-gadget.dto';

@Injectable()
export class GadgetsService {
  constructor(
    @InjectModel(Gadget.name) private readonly gadgetModel: Model<Gadget>,
    @Inject(BrandsService) private readonly brandsService: BrandsService
  ) {}

  public async findAll(): Promise<Gadget[]> {
    return await this.gadgetModel.find().populate('brands').select('-isActive');
  }

  public async findAllActive(): Promise<Gadget[]> {
    return await this.gadgetModel
      .find({ isActive: true })
      .populate('brands')
      .select('-isActive');
  }

  public async findOneByQuery(query: UpdateGadgetDto): Promise<Gadget> {
    return await this.gadgetModel
      .findOne(query)
      .populate('brands')
      .select('-isActive');
  }

  public async findOneById(id: string): Promise<Gadget> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const gadget = await this.gadgetModel
      .findById(id)
      .populate('brands')
      .select('-isActive');

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

    console.log({ dto });

    const updatedGadget = await this.gadgetModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('brands')
      .select('-isActive');

    return updatedGadget;
  }

  public async updateImages(
    id: string,
    dto: UpdateImageGadgetDto
  ): Promise<Gadget> {
    await this.findOneById(id);

    const gadget = await this.gadgetModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return gadget;
  }

  public async updateBrandsGadget(id: string, brandIds: string[]) {
    const brands = await this.brandsService.findAllByIds(brandIds);

    const gadget = await this.gadgetModel
      .findByIdAndUpdate(
        id,
        {
          brands
        },
        { new: true }
      )
      .populate('brands')
      .select('-isActive');

    return gadget;
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
