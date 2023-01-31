import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CityService } from './city.service'
import { CityDto } from './dto';
import {CreateCityInput, FindCityInput } from './inputs';

@Resolver()
export class CityResolver {
  constructor(
    private cityService: CityService
  ) {}
  @Mutation(() => CityDto)
  async createCity(
    @Args('input') input: CreateCityInput,
  ) {
    return this.cityService.create(input);
  }
  @Query(() => [CityDto])
  async cities() {
    return this.cityService.getCities()
  }
  
 @Query(() => CityDto)
 async findCity(
    @Args('input') input: FindCityInput
  ) {
  return this.cityService.findCity(input)
 }
}
