import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Issue } from './schemas/issue.schema';

@Injectable()
export class IssuesService {
  constructor(@InjectModel(Issue.name) private issueModel: Model<Issue>) {}

  public async findAll() {
    const issues = await this.issueModel.find();

    return issues;
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
