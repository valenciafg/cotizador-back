import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CityModule } from 'src/city/city.module';
import { ServiceModule } from 'src/service/service.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  controllers: [SeedController],
  imports: [
    CityModule,
    ServiceModule,
    CompanyModule,
  ],
  providers: [SeedService]
})
export class SeedModule {}
