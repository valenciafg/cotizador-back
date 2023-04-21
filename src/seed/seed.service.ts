import { Injectable, Logger } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { Service } from '../service/entities';
import { ServiceService } from '../service/service.service';
import { CompanyService } from '../company/company.service';
import * as citySeed from './data/citySeed.json';
import * as serviceSeed from './data/services.seed.json';
import * as companySeed from './data/companies.seed.json';
import { Company } from '../company/entities';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private cityService: CityService,
    private serviceService: ServiceService,
    private companyService: CompanyService,
  ) {}

  async executeSeed() {
    await this.cityService.registerMany(citySeed);
    await this.serviceService.registerMany(serviceSeed as Service[]);
    await this.companyService.registerMany(companySeed as Company[]);
    return `This action returns all seed`;
  }
}
