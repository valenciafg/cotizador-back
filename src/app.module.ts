import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    /*
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    */
    MongooseModule.forRoot('mongodb://localhost:27017/nest-cotizador'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
