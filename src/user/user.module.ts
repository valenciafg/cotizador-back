import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { CompanyModule } from '../company/company.module';
import { HeadingModule } from 'src/heading/heading.module';
import { ServiceModule } from 'src/service/service.module';
import { KnowledgeModule } from 'src/knowledge/knowledge.module';
import { ProjectModule } from 'src/project/project.module';

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
    ProjectModule
  ],
})
export class UserModule {}
