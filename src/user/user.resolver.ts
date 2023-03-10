import {  UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import {  CurrentUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CityService } from 'src/city/city.service';
import { DeparmentDto, DistrictDto, ProvinceDto } from 'src/city/dto';
import { CompanyService } from 'src/company/company.service';
import { CompanyDto } from 'src/company/dto';
import { FileDto } from 'src/files/dto';
import { FilesService } from 'src/files/files.service';
import { HeadingService } from 'src/heading/heading.service';
import { KnowledgeService } from 'src/knowledge/knowledge.service';
import { ProjectService } from 'src/project/project.service';
import { ServiceService } from 'src/service/service.service';
import { UserDto } from './dto';
import { User } from './entities/user.entity';
import { SearchUsersInput } from './inputs';
import { UserService } from './user.service'

@Resolver(of => UserDto)
export class UserResolver {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private serviceService: ServiceService,
    private knowledgeService: KnowledgeService,
    private headingService: HeadingService,
    private projectService: ProjectService,
    private cityService: CityService,
    private fileService: FilesService,
  ) {}
  @Query(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async me(
    @CurrentUser() user: User
  ) {
    return user
  }
  @Query(returns => [UserDto])
  async users(
    @Args('input') input: SearchUsersInput
  ) {
    return this.userService.getUsers(input);
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
  @ResolveField('department', returns => DeparmentDto)
  async getdeparment(@Parent() user: UserDto) {
    const { departmentId } = user
    const [result] = await this.cityService.getDeparments(departmentId)
    return result ? result : null
  }
  @ResolveField('province', returns => ProvinceDto)
  async getProvince(@Parent() user: UserDto) {
    const { provinceId } = user
    const [result] = await this.cityService.getProvinces(null, provinceId)
    return result ? result : null
  }
  @ResolveField('district', returns => DistrictDto)
  async getDistrict(@Parent() user: UserDto) {
    const { districtId } = user
    const [result] = await this.cityService.getDistricts(null, districtId)
    return result ? result : null
  }
  @ResolveField('profilePic', returns => FileDto)
  async getProfilePic(@Parent() user: UserDto) {
    const { uuid, profilePic } = user
    const response = await this.fileService.getUserFile(profilePic, uuid)
    return response;
  }
  @Mutation(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserKnowledge(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String
    })
    name: string,
  ) {
    const { uuid } = user
    const result = await this.userService.addKnowlege(uuid, name)
    return result
  }
  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserKnowledge(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user
    const result = await this.userService.deleteKnowledge(userUuid, uuid)
    return result
  }
  @Mutation(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserWorkedProject(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String
    })
    name: string,
  ) {
    const { uuid } = user
    const result = await this.userService.addWorkedProject(uuid, name)
    return result
  }
  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserWorkedProject(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user
    const result = await this.userService.deleteWorkedProject(userUuid, uuid)
    return result
  }
  @Mutation(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserCurrentCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String
    })
    name: string,
  ) {
    const { uuid } = user
    const result = await this.userService.addCurrentCompany(uuid, name)
    return result
  }
  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserCurrentCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user
    const result = await this.userService.deleteCurrentCompany(userUuid, uuid)
    return result
  }
  @Mutation(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserWorkedCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String
    })
    name: string,
  ) {
    const { uuid } = user
    const result = await this.userService.addWorkedCompany(uuid, name)
    return result
  }
  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserWorkedCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user
    const result = await this.userService.deleteWorkedCompany(userUuid, uuid)
    return result
  }
  @Mutation(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserService(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String
    })
    name: string,
  ) {
    const { uuid } = user
    const result = await this.userService.addService(uuid, name)
    return result
  }
  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserService(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user
    const result = await this.userService.deleteService(userUuid, uuid)
    return result
  }
  @Mutation(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserHeading(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String
    })
    name: string,
  ) {
    const { uuid } = user
    const result = await this.userService.addHeading(uuid, name)
    return result
  }
  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserHeading(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user
    const result = await this.userService.deleteHeading(userUuid, uuid)
    return result
  }
}
