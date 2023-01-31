import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HeadingDto } from './dto';
import { HeadingService } from './heading.service';
import { CreateHeadingInput, FindHeadingInput } from './inputs';

@Resolver()
export class HeadingResolver {
  constructor(
    private headingService: HeadingService
  ) {}
  @Mutation(() => HeadingDto)
  async createHeading(
    @Args('input') input: CreateHeadingInput,
  ) {
    return this.headingService.create(input);
  }
  @Query(() => [HeadingDto])
  async headings() {
    return this.headingService.getHeadings()
  }
  
 @Query(() => HeadingDto)
 async findHeading(
    @Args('input') input: FindHeadingInput
  ) {
  return this.headingService.findHeading(input)
 }
}
