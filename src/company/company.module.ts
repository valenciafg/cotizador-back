import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities';

@Module({
  providers: [CompanyService, CompanyResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema
      }
    ])
  ]
})
export class CompanyModule {}
