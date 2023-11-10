import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';

import { IPaginationAnswer } from 'shared/interfaces/pagination-answer.interface';

import { Article } from './schemas/article.schema';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from 'shared/dto/pagination.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {}

  public async findWithPagination(
    { page = 1, limit = 1000000, sort = 'desc' }: PaginationDto,
    query: UpdateArticleDto
  ): Promise<IPaginationAnswer<Article>> {
    const result: IPaginationAnswer<Article> = {
      itemsCount: 0,
      totalItems: 0,
      totalPages: 0,
      rangeStart: 0,
      rangeEnd: 0,
      items: []
    };

    const totalArticles = await this.articleModel.find(query);

    result.totalItems = totalArticles.length;
    result.totalPages = Math.ceil(totalArticles.length / limit);

    const articles = await this.articleModel
      .find(query)
      .sort({ updatedAt: sort as SortOrder })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate({ path: 'image' })
      .select(['-createdAt', '-updatedAt']);

    result.items = articles;
    result.itemsCount = articles.length;
    result.rangeStart = articles.length ? limit * (page - 1) : 0;
    result.rangeEnd = articles.length ? result.rangeStart + result.itemsCount : 0;

    return result;
  }

  public async findOneByQuery(query: UpdateArticleDto): Promise<Article | null> {
    return await this.articleModel.findOne(query).populate({ path: 'image' });
  }

  public async findOneById(id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.articleModel.findById(id).populate({ path: 'image' });

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" was not found`);
    }

    return article;
  }

  public async create(dto: CreateArticleDto): Promise<Article> {
    const foundArticle = await this.articleModel.findOne({ slug: dto.slug });

    if (foundArticle) {
      throw new BadRequestException(
        `Article with slug "${dto.slug}" already exists`
      );
    }

    const createdArticle = await new this.articleModel(dto).save();
    const article = await this.findOneById(createdArticle._id);

    return article;
  }

  public async update(id: string, dto: UpdateArticleDto): Promise<Article | null> {
    await this.findOneById(id);

    const article = await this.articleModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate({ path: 'image' });

    return article;
  }

  public async remove(id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.articleModel.findByIdAndDelete(id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} was not found`);
    }

    return article;
  }
}
