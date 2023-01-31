import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';
import { City, CitySchema } from './entities/city.entity';

@Module({
  providers: [CityResolver, CityService],
  imports: [
    MongooseModule.forFeature([
      {
        name: City.name,
        schema: CitySchema
      }
    ])
  ]
})
export class CityModule {}
