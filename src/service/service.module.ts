import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './entities';

@Module({
  providers: [ServiceService, ServiceResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Service.name,
        schema: ServiceSchema
      }
    ])
  ],
  exports: [ServiceService]
})
export class ServiceModule {}
