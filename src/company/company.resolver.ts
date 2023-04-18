import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto';
import { CreateCompanyInput, FindCompanyInput } from './inputs';

@Resolver()
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}
  @Mutation(() => CompanyDto)
  async createCompany(@Args('input') input: CreateCompanyInput) {
    return this.companyService.create(input);
  }
  @Query(() => [CompanyDto])
  async companies() {
    return this.companyService.getCompanies();
  }

  @Query(() => CompanyDto)
  async findCompany(@Args('input') input: FindCompanyInput) {
    return this.companyService.findCompany(input);
  }
}
