import { Module } from '@nestjs/common';
import { HeadingService } from './heading.service';
import { HeadingResolver } from './heading.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Heading, HeadingSchema } from './entities';

@Module({
  providers: [HeadingService, HeadingResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Heading.name,
        schema: HeadingSchema,
      },
    ]),
  ],
  exports: [HeadingService],
})
export class HeadingModule {}
