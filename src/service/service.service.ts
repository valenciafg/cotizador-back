import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { Service } from './entities';
import { CreateServiceInput, FindServiceInput } from './inputs/service.input';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name);
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>
  ){}

  async create(createServiceInput: CreateServiceInput): Promise<Service> {
    try {
      const service = await this.serviceModel.create({ ...createServiceInput });
      return service;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getServices(): Promise<Service[]> {
    const services = await this.serviceModel.find()
    return services
  }
  async findService(findServiceInput: FindServiceInput): Promise<Service> {
    const service = await this.serviceModel.findOne({ ...findServiceInput })
    return service
  }
}
