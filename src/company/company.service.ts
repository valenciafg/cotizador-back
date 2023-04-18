import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions, genUUID } from 'src/utils';
import { Company } from './entities';
import { CreateCompanyInput, FindCompanyInput } from './inputs';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    try {
      const company = await this.companyModel.create({ ...createCompanyInput });
      return company;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getCompanies(uuidList?: string[]): Promise<Company[]> {
    if (!uuidList) {
      const companies = await this.companyModel.find().sort({ createdAt: -1 });
      return companies;
    }
    const companies = await this.companyModel
      .find({
        uuid: {
          $in: uuidList,
        },
      })
      .sort({ createdAt: -1 });
    return companies;
  }
  async findCompany(findCompanyInput: FindCompanyInput): Promise<Company> {
    const company = await this.companyModel.findOne({ ...findCompanyInput });
    return company;
  }
  async findOrCreate(name: string) {
    const doc = await this.companyModel.findOne({
      name: name.toLocaleLowerCase(),
    });
    if (doc) {
      return doc;
    }
    return this.companyModel.create({
      uuid: genUUID(),
      name: name.toLocaleLowerCase(),
    });
  }

  async registerMany(companies: Company[]) {
    try {
      const response = await this.companyModel.insertMany(companies);
      return response;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
