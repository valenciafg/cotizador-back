import { Injectable, Logger } from '@nestjs/common';
import { CityService } from 'src/city/city.service';
import * as citySeed from './data/citySeed.json'

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private cityService: CityService
  ) {}

  async executeSeed() {
    const response = await this.cityService.registerMany(citySeed)
    return `This action returns all seed`;
  }
}
