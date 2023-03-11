import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
// import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './entities/file.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
    ConfigModule,
    // UserModule,
    ConfigModule
  ],
  exports: [FilesService]
})
export class FilesModule {}
