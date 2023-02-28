import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { EnvConfiguration, JoiValidationSchema } from './config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import {
  ApolloServerPluginLandingPageLocalDefault
 } from 'apollo-server-core';
import { CityModule } from './city/city.module';
import { CompanyModule } from './company/company.module';
import { ServiceModule } from './service/service.module';
import { HeadingModule } from './heading/heading.module';
import { ProjectModule } from './project/project.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { PostModule } from './post/post.module'
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    /*
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    */
   GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: false,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault
    ]
   }),
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    CommonModule,
    FilesModule,
    AuthModule,
    CityModule,
    CompanyModule,
    ServiceModule,
    HeadingModule,
    ProjectModule,
    KnowledgeModule,
    PostModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
