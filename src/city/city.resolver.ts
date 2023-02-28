import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CityService } from './city.service'
import { CityDto, DeparmentDto, DistrictDto, ProvinceDto } from './dto';
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

 @Query(() => [DeparmentDto])
 async getDeparments() {
  return this.cityService.getDeparments()
 }
 @Query(() => [ProvinceDto])
 async getProvinces(
  @Args({
    name: 'departamentoInei',
    type: () => String
  })
  departamentoInei: string,
 ) {
  return this.cityService.getProvinces(departamentoInei)
 }
 @Query(() => [DistrictDto])
 async getDistricts(
  @Args({
    name: 'provinciaInei',
    type: () => String
  })
  provinciaInei: string,
 ) {
  return this.cityService.getDistricts(provinciaInei)
 }
}
