import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { CompanyModule } from '../company/company.module';
import { HeadingModule } from '../heading/heading.module';
import { ServiceModule } from '../service/service.module';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { ProjectModule } from '../project/project.module';
import { CityModule } from '../city/city.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CompanyModule,
    HeadingModule,
    ServiceModule,
    KnowledgeModule,
    ProjectModule,
    CityModule,
    FilesModule,
  ],
  exports: [UserService],
})
export class UserModule {}
