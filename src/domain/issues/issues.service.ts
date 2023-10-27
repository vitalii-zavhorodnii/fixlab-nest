import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Issue } from './schemas/issue.schema';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(@InjectModel(Issue.name) private readonly issueModel: Model<Issue>) {}

  public async findAll(): Promise<Issue[]> {
    return await this.issueModel
      .find()
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findAllActive(): Promise<Issue[]> {
    return await this.issueModel
      .find({ isActive: true })
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneByQuery(query: UpdateIssueDto): Promise<Issue> {
    return await this.issueModel
      .findOne(query)
      .select('-isActive')
      .populate({ path: 'image' })
      .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneById(id: string): Promise<Issue> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const issue = await this.issueModel
      .findById(id)
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });

    if (!issue) {
      throw new NotFoundException(`Issue with ID "${id}" was not found`);
    }

    return issue;
  }

  public async create(dto: CreateIssueDto): Promise<Issue> {
    const foundIssue = await this.issueModel.findOne({
      slug: dto.slug
    });

    if (foundIssue) {
      throw new BadRequestException(`Issue with slug "${dto.slug}" already exists`);
    }

    const createdIssue = await new this.issueModel(dto).save();
    const issue = await this.findOneById(createdIssue._id);
    return issue;
  }

  public async update(id: string, dto: UpdateIssueDto): Promise<Issue> {
    await this.findOneById(id);

    const updatedIssue = await this.issueModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate('image')
      .populate({ path: 'benefits', populate: { path: 'icon' } });
    return updatedIssue;
  }

  public async remove(id: string): Promise<Issue> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const contact = await this.issueModel.findByIdAndDelete(id);

    if (!contact) {
      throw new NotFoundException(`Issue with ID ${id} was not found`);
    }

    return contact;
  }
}
