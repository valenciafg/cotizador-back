import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule, UserModule, ConfigModule],
})
export class FilesModule {}
