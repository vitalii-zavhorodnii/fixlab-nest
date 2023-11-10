import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Image } from './schemas/image.schema';

import { AddImageDto } from './dto/add-image.dto';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image.name) private readonly imageModel: Model<Image>) {}

  public async findAll(): Promise<Image[]> {
    return await this.imageModel.find();
  }

  public async findAllByType({ type }: { type: string }): Promise<Image[]> {
    return await this.imageModel.find({ type });
  }

  public async add(dto: AddImageDto): Promise<Image> {
    const addedImage = await new this.imageModel(dto).save();
    const image = await this.findOneById(addedImage._id);

    return image;
  }

  public async findOneById(id: string): Promise<Image> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const image = await this.imageModel.findById(id);

    if (!image) {
      throw new NotFoundException(`Image with ID "${id}" was not found`);
    }

    return image;
  }

  public async update(id: string, dto: AddImageDto): Promise<Image | null> {
    await this.findOneById(id);

    const image = await this.imageModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return image;
  }

  public async remove(id: string): Promise<Image> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const image = await this.imageModel.findByIdAndDelete(id);

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} was not found`);
    }

    return image;
  }
}
