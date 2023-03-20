import { Injectable, Logger } from '@nestjs/common';
import { CityService } from 'src/city/city.service';
import { Service } from 'src/service/entities';
import { ServiceService } from 'src/service/service.service';
import * as citySeed from './data/citySeed.json';
import * as serviceSeed from './data/services.seed.json';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private cityService: CityService,
    private serviceService: ServiceService
  ) {}

  async executeSeed() {
    await this.cityService.registerMany(citySeed);
    await this.serviceService.registerMany(serviceSeed as Service[]);
    return `This action returns all seed`;
  }
}
