import { Module } from '@nestjs/common';
import { HeadingService } from './heading.service';
import { HeadingResolver } from './heading.resolver';

@Module({
  providers: [HeadingService, HeadingResolver]
})
export class HeadingModule {}
