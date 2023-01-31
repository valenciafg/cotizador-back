import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';

@Module({
  providers: [ServiceService, ServiceResolver]
})
export class ServiceModule {}
