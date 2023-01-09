import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { EnvConfiguration, JoiValidationSchema } from './config';

@Module({
  imports: [
    /*
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    */
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-cotizador'),
    UserModule,
    CommonModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
