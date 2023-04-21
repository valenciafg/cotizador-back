import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uniqBy } from 'lodash';
import { handleRegisterExceptions } from '../utils';
import { City } from './entities/city.entity';
import { CreateCityInput, FindCityInput } from './inputs';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}
  async create(createCityInput: CreateCityInput): Promise<City> {
    try {
      const city = await this.cityModel.create({ ...createCityInput });
      return city;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getCities(): Promise<City[]> {
    const cities = await this.cityModel.find();
    return cities;
  }
  async findCity(findCityInput: FindCityInput): Promise<City> {
    const city = await this.cityModel.findOne({ ...findCityInput });
    return city;
  }
  async registerMany(cities: City[]) {
    try {
      const response = await this.cityModel.insertMany(cities);
      return response;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getDeparments(departamentoInei?: string) {
    let query = {};
    if (departamentoInei && departamentoInei !== '') {
      query = { ...query, departamentoInei };
    }
    const response = await this.cityModel
      .find(query)
      .select({ departamentoInei: 1, departamento: 1 });
    return uniqBy(response, 'departamentoInei');
  }
  async getProvinces(departamentoInei?: string, provinciaInei?: string) {
    let query = {};
    if (departamentoInei && departamentoInei !== '') {
      query = { ...query, departamentoInei };
    }
    if (provinciaInei && provinciaInei !== '') {
      query = { ...query, provinciaInei };
    }
    const response = await this.cityModel
      .find(query)
      .select({ provinciaInei: 1, provincia: 1 });
    return uniqBy(response, 'provinciaInei');
  }
  async getDistricts(provinciaInei?: string, uuid?: string) {
    let query = {};
    if (provinciaInei && provinciaInei !== '') {
      query = { ...query, provinciaInei };
    }
    if (uuid && uuid !== '') {
      query = { ...query, uuid };
    }
    const response = await this.cityModel
      .find(query)
      .select({ idUbigeo: 1, distrito: 1, uuid: 1 });
    return uniqBy(response, 'idUbigeo');
  }
}
