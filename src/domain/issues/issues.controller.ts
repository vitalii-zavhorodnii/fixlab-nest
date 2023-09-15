import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IssuesService } from './issues.service';

import { Issue } from './schemas/issue.schema';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.issues)
@Controller(ROUTES.issues)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'find all Issues' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Get('')
  public async findAll() {
    return await this.issuesService.findAll();
  }

  @ApiOperation({ summary: 'remove permanently Issue by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Issue was not found' })
  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    await this.issuesService.remove(id);

    return { status: 204, result: 'success' };
  }
}
