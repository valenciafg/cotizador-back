import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CityModule } from 'src/city/city.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  controllers: [SeedController],
  imports: [CityModule, ServiceModule],
  providers: [SeedService]
})
export class SeedModule {}
