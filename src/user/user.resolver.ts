import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CityService } from '../city/city.service';
import { DeparmentDto, DistrictDto, ProvinceDto } from '../city/dto';
import { CompanyService } from '../company/company.service';
import { CompanyDto } from '../company/dto';
import { USER_TYPE } from '../constants';
import { FileDto } from '../files/dto';
import { FilesService } from '../files/files.service';
import { HeadingService } from '../heading/heading.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { ProjectService } from '../project/project.service';
import { ServiceService } from '../service/service.service';
import { UserDto, UserListDto } from './dto';
import { User } from './entities/user.entity';
import { SearchUsersInput, SearchUsersOptions } from './inputs';
import { UserService } from './user.service';

@Resolver((of) => UserDto)
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
  @Query((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }
  @Query((returns) => UserListDto)
  async users(
    @Args('input') input: SearchUsersInput,
    @Args('options') options: SearchUsersOptions,
  ) {
    return this.userService.getUsers(options, input);
  }
  @Query((returns) => UserDto)
  async user(
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const user = await this.userService.findOneByUuid(uuid);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  @ResolveField('currentCompanies', (returns) => [CompanyDto])
  async getCurrentCompanies(@Parent() user: UserDto) {
    const { currentCompanies } = user;
    const result = await this.companyService.getCompanies(currentCompanies);
    return result;
  }
  @ResolveField('workedCompanies', (returns) => [CompanyDto])
  async getWorkedCompanies(@Parent() user: UserDto) {
    const { workedCompanies } = user;
    const result = await this.companyService.getCompanies(workedCompanies);
    return result;
  }
  @ResolveField('workedProjects', (returns) => [CompanyDto])
  async getWorkedProjects(@Parent() user: UserDto) {
    const { workedProjects } = user;
    const result = await this.projectService.getProjects(workedProjects);
    return result;
  }

  @ResolveField('services', (returns) => [CompanyDto])
  async getServices(@Parent() user: UserDto) {
    const { services } = user;
    const result = await this.serviceService.getServices(services);
    return result;
  }
  @ResolveField('knowledges', (returns) => [CompanyDto])
  async getKnowledges(@Parent() user: UserDto) {
    const { knowledges } = user;
    const result = await this.knowledgeService.getKnowledges(knowledges);
    return result;
  }
  @ResolveField('headings', (returns) => [CompanyDto])
  async getHeadings(@Parent() user: UserDto) {
    const { headings } = user;
    const result = await this.headingService.getHeadings(headings);
    return result;
  }
  @ResolveField('department', (returns) => DeparmentDto)
  async getdeparment(@Parent() user: UserDto) {
    const { departmentId } = user;
    const [result] = await this.cityService.getDeparments(departmentId);
    return result ? result : null;
  }
  @ResolveField('province', (returns) => ProvinceDto)
  async getProvince(@Parent() user: UserDto) {
    const { provinceId } = user;
    const [result] = await this.cityService.getProvinces(null, provinceId);
    return result ? result : null;
  }
  @ResolveField('district', (returns) => DistrictDto)
  async getDistrict(@Parent() user: UserDto) {
    const { districtId } = user;
    const [result] = await this.cityService.getDistricts(null, districtId);
    return result ? result : null;
  }
  @ResolveField('profilePic', (returns) => FileDto, { nullable: true })
  async getProfilePic(@Parent() user: UserDto) {
    const { uuid, profilePic } = user;
    if (!profilePic) {
      return null;
    }
    const response = await this.fileService.getUserFile(profilePic, uuid);
    return response;
  }
  @Mutation((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserKnowledge(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String,
    })
    name: string,
  ) {
    const { uuid } = user;
    const result = await this.userService.addKnowlege(uuid, name);
    return result;
  }
  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserKnowledge(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user;
    const result = await this.userService.deleteKnowledge(userUuid, uuid);
    return result;
  }
  @Mutation((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserWorkedProject(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String,
    })
    name: string,
  ) {
    const { uuid } = user;
    const result = await this.userService.addWorkedProject(uuid, name);
    return result;
  }
  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserWorkedProject(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user;
    const result = await this.userService.deleteWorkedProject(userUuid, uuid);
    return result;
  }
  @Mutation((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserCurrentCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String,
    })
    name: string,
  ) {
    const { uuid } = user;
    const result = await this.userService.addCurrentCompany(uuid, name);
    return result;
  }
  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserCurrentCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user;
    const result = await this.userService.deleteCurrentCompany(userUuid, uuid);
    return result;
  }
  @Mutation((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserWorkedCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String,
    })
    name: string,
  ) {
    const { uuid } = user;
    const result = await this.userService.addWorkedCompany(uuid, name);
    return result;
  }
  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserWorkedCompany(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user;
    const result = await this.userService.deleteWorkedCompany(userUuid, uuid);
    return result;
  }
  @Mutation((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserService(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String,
    })
    name: string,
  ) {
    const { uuid } = user;
    const result = await this.userService.addService(uuid, name);
    return result;
  }
  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserService(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user;
    const result = await this.userService.deleteService(userUuid, uuid);
    return result;
  }
  @Mutation((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  async addUserHeading(
    @CurrentUser() user: User,
    @Args({
      name: 'name',
      type: () => String,
    })
    name: string,
  ) {
    const { uuid } = user;
    const result = await this.userService.addHeading(uuid, name);
    return result;
  }
  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  async deleteUserHeading(
    @CurrentUser() user: User,
    @Args({
      name: 'uuid',
      type: () => String,
    })
    uuid: string,
  ) {
    const { uuid: userUuid } = user;
    const result = await this.userService.deleteHeading(userUuid, uuid);
    return result;
  }
  @ResolveField('fullname', (returns) => String, { nullable: true })
  async getUserFullname(@Parent() user: UserDto) {
    if (!user) {
      return null;
    }
    const fullname =
      user.userType === USER_TYPE.PROFESSIONAL
        ? `${user.name} ${user.lastName}`
        : user.commercialName;
    return fullname;
  }
  @ResolveField('fullAddress', (returns) => String, { nullable: true })
  async getUserFullAddress(@Parent() user: UserDto) {
    if (!user) {
      return null;
    }
    const fullAddress = await this.userService.getFullAddress(user);
    return fullAddress;
  }
}
