import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { Company } from './entities';
import { CreateCompanyInput, FindCompanyInput } from './inputs';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>
  ){}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    try {
      const company = await this.companyModel.create({ ...createCompanyInput });
      return company;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getCompanies(): Promise<Company[]> {
    const companies = await this.companyModel.find()
    return companies
  }
  async findCompany(findCompanyInput: FindCompanyInput): Promise<Company> {
    const company = await this.companyModel.findOne({ ...findCompanyInput })
    return company
  }
}
