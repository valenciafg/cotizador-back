import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectDto } from './dto';
import { CreateProjectInput, FindProjectInput } from './inputs';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(
    private projectService: ProjectService
  ) {}
  @Mutation(() => ProjectDto)
  async createProject(
    @Args('input') input: CreateProjectInput,
  ) {
    return this.projectService.create(input);
  }
  @Query(() => [ProjectDto])
  async projects() {
    return this.projectService.getProjects()
  }
  
 @Query(() => ProjectDto)
 async findProject(
    @Args('input') input: FindProjectInput
  ) {
  return this.projectService.findProject(input)
 }
}
