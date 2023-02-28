import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CityModule } from 'src/city/city.module';

@Module({
  controllers: [SeedController],
  imports: [CityModule],
  providers: [SeedService]
})
export class SeedModule {}
