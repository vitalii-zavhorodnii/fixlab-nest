import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Response as Res
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';
import { Response } from 'express';

import { ISuccessDelete } from 'shared/interfaces/success-delete.interface';

import { IssuesService } from './issues.service';

import { Issue } from './schemas/issue.schema';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.issues)
@Controller(ROUTES.issues)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'public, find all active issues' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Public()
  @Get('')
  public async findAll(): Promise<Issue[]> {
    return await this.issuesService.findAllActive();
  }

  @ApiOperation({ summary: 'public, get gadget by slug' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Issue> {
    const issue = await this.issuesService.findOneByQuery({
      slug
    });

    if (!issue) {
      throw new NotFoundException(`Issue with slug "${slug}" was not found`);
    }

    return issue;
  }

  @ApiOperation({ summary: 'get all issue data' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Get('/all')
  public async findAllIssues(@Res() response: Response): Promise<void> {
    const result: Issue[] = await this.issuesService.findAll();

    response.header('Content-Range', `issues ${result.length}`);
    response.send(result);
  }

  @ApiOperation({ summary: 'get issue data by ID' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({ status: 404, description: 'Issue was not found' })
  @Public()
  @Get('/:id')
  public async findIssueById(@Param('id') id: string): Promise<Issue> {
    return await this.issuesService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new issue' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createIssue(
    @Body()
    dto: CreateIssueDto
  ): Promise<Issue> {
    return await this.issuesService.create(dto);
  }

  @ApiOperation({ summary: 'update existing issue by ID' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Put('/:id')
  public async updateIssue(
    @Param('id') id: string,
    @Body()
    dto: UpdateIssueDto
  ): Promise<Issue> {
    return await this.issuesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently issue by ID'
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.issuesService.remove(id);

    return { status: 204, result: 'success' };
  }
}
