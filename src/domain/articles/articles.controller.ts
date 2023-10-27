import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Response as Res
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';
import { Response } from 'express';

import { ISuccessDelete } from 'shared/interfaces/success-delete.interface';

import { ArticlesService } from './articles.service';

import { Article } from './schemas/article.schema';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from 'shared/dto/pagination.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.articles)
@Controller(ROUTES.articles)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'public, get all active articles' })
  @ApiResponse({ status: 200, type: Article, isArray: true })
  @Public()
  @Get('')
  public async findActiveArticles(
    @Res() response: Response,
    @Query() { page, limit }: PaginationDto
  ): Promise<void> {
    const articles = await this.articlesService.findWithPagination(
      { page, limit },
      { isActive: true }
    );

    response.header(
      'Content-Range',
      `articles ${articles.rangeStart}-${articles.rangeEnd}/${articles.totalItems}`
    );
    response.send(articles);
  }

  @ApiOperation({ summary: 'public, get article by slug' })
  @ApiResponse({ status: 200, type: Article, isArray: true })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Article> {
    const result = await this.articlesService.findOneByQuery({ slug });

    if (!result) {
      throw new NotFoundException(`Article with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get all articles' })
  @ApiResponse({ status: 200, type: Article })
  @Get('/all')
  public async findAllArticles(
    @Res() response: Response,
    @Query() { page, limit }: PaginationDto
  ): Promise<void> {
    const articles = await this.articlesService.findWithPagination({ page, limit });

    response.header(
      'Content-Range',
      `articles ${articles.rangeStart}-${articles.rangeEnd}/${articles.totalItems}`
    );
    response.send(articles);
  }

  @ApiOperation({ summary: 'get article data by ID' })
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 404, description: 'Articles was not found' })
  @Get('/:id')
  public async findArticleById(@Param('id') id: string): Promise<Article> {
    return await this.articlesService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new article' })
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createArticle(
    @Body()
    dto: CreateArticleDto
  ): Promise<Article> {
    return await this.articlesService.create(dto);
  }

  @ApiOperation({ summary: 'update existing article by ID' })
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 404, description: 'Article was not found' })
  @Put('/:id')
  public async updateArticle(
    @Param('id') id: string,
    @Body()
    dto: UpdateArticleDto
  ): Promise<Article> {
    return await this.articlesService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently article by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Article was not found' })
  @Delete('/:id')
  public async removeArticle(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.articlesService.remove(id);

    return { status: 204, result: 'success' };
  }
}
