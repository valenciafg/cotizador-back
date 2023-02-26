import {  UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import {  CurrentUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CompanyService } from 'src/company/company.service';
import { CompanyDto } from 'src/company/dto';
import { HeadingService } from 'src/heading/heading.service';
import { KnowledgeService } from 'src/knowledge/knowledge.service';
import { ProjectService } from 'src/project/project.service';
import { ServiceService } from 'src/service/service.service';
import { UserDto } from './dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service'

@Resolver(of => UserDto)
export class UserResolver {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private serviceService: ServiceService,
    private knowledgeService: KnowledgeService,
    private headingService: HeadingService,
    private projectService: ProjectService
  ) {}
  @Query(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async me(
    @CurrentUser() user: User
  ) {
    return user
  }
  @ResolveField('currentCompanies', returns => [CompanyDto])
  async getCurrentCompanies(@Parent() user: UserDto) {
    const { currentCompanies } = user
    const result = await this.companyService.getCompanies(currentCompanies)
    return result
  }
  @ResolveField('workedCompanies', returns => [CompanyDto])
  async getWorkedCompanies(@Parent() user: UserDto) {
    const { workedCompanies } = user
    const result = await this.companyService.getCompanies(workedCompanies)
    return result
  }
  @ResolveField('workedProjects', returns => [CompanyDto])
  async getWorkedProjects(@Parent() user: UserDto) {
    const { workedProjects } = user
    const result = await this.projectService.getProjects(workedProjects)
    return result
  }

  @ResolveField('services', returns => [CompanyDto])
  async getServices(@Parent() user: UserDto) {
    const { services } = user
    const result = await this.serviceService.getServices(services)
    return result
  }
  @ResolveField('knowledges', returns => [CompanyDto])
  async getKnowledges(@Parent() user: UserDto) {
    const { knowledges } = user
    const result = await this.knowledgeService.getKnowledges(knowledges)
    return result
  }
  @ResolveField('headings', returns => [CompanyDto])
  async getHeadings(@Parent() user: UserDto) {
    const { headings } = user
    const result = await this.headingService.getHeadings(headings)
    return result
  }
}
