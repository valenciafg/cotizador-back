import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServiceDto } from './dto';
import { CreateServiceInput, FindServiceInput } from './inputs';
import { ServiceService } from './service.service';

@Resolver()
export class ServiceResolver {
  constructor(
    private serviceService: ServiceService
  ) {}
  @Mutation(() => ServiceDto)
  async createService(
    @Args('input') input: CreateServiceInput,
  ) {
    return this.serviceService.create(input);
  }
  @Query(() => [ServiceDto])
  async services() {
    return this.serviceService.getServices()
  }
  
 @Query(() => ServiceDto)
 async findService(
    @Args('input') input: FindServiceInput
  ) {
  return this.serviceService.findService(input)
 }
}
