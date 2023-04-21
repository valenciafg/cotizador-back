import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
  Body,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../user/entities/user.entity';
// import { UploadFileDto } from './dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}
  @Get('user/url/:uuid')
  @Auth()
  async getUserFileUrl(@GetUser() user: User, @Param('uuid') uuid: string) {
    return this.filesService.getUserFileUrl(uuid, user.uuid);
  }
  @Get('user/:uuid')
  @Auth()
  async getUserFile(@GetUser() user: User, @Param('uuid') uuid: string) {
    return this.filesService.getUserFile(uuid, user.uuid);
  }
}
