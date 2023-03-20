import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions, genUUID } from 'src/utils';
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
  async getServices(uuidList?: string[]): Promise<Service[]> {
    if(!uuidList) {
      const services = await this.serviceModel.find().sort({ createdAt: -1 })
      return services
    }
    const services = await this.serviceModel.find({ uuid: {
      "$in": uuidList
    }}).sort({ createdAt: -1 })
    return services;
  }
  async findService(findServiceInput: FindServiceInput): Promise<Service> {
    const service = await this.serviceModel.findOne({ ...findServiceInput })
    return service
  }
  async findOrCreate(name: string) {
    const doc = await this.serviceModel.findOne({ name: name.toLocaleLowerCase()})
    if (doc) {
      return doc;
    }
    return this.serviceModel.create({
      uuid: genUUID(),
      name: name.toLocaleLowerCase(),
    });
  }
  async registerMany(services: Service[]) {
    try {
      const response = await this.serviceModel.insertMany(services);
      return response;
    } catch (error) {
      this.logger.error(error)
    }
  }
}
