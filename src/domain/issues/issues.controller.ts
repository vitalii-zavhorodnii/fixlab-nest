import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { ISuccessDelete } from 'interfaces/success-delete.interface';

import { IssuesService } from './issues.service';

import { Issue } from './schemas/issue.schema';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.issues)
@Controller(ROUTES.issues)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({
    summary: 'No-auth* find all active Issues'
  })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Get('')
  public async findAll(): Promise<Issue[]> {
    return await this.issuesService.findAllActive();
  }

  @ApiOperation({ summary: 'No-auth* get Gadget by slug' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Issue> {
    const result = await this.issuesService.findOneByQuery({
      slug
    });

    if (!result) {
      throw new NotFoundException(`Issue with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get all Issue data' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Get('/all')
  public async findAllIssues(): Promise<Issue[]> {
    return await this.issuesService.findAll();
  }

  @ApiOperation({ summary: 'create new Issue' })
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

  @ApiOperation({ summary: 'update existing Issue by ID' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Patch('/:id')
  public async updateIssue(
    @Param('id') id: string,
    @Body()
    dto: UpdateIssueDto
  ): Promise<Issue> {
    return await this.issuesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently Issue by ID'
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
