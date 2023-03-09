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
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/user/entities/user.entity';
import { UploadFileDto } from './dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}
  @Post('user')
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserFile(
    @GetUser() user: User,
    @UploadedFile()
    file: Express.Multer.File,
    @Body() options: UploadFileDto,
  ) {
    const result = await this.filesService.uploadUserFile(options, file, user)
    return result
  }
  @Get('user/url/:uuid')
  @Auth()
  async getUserFileUrl(
    @GetUser() user: User,
    @Param('uuid') uuid: string
  ) {
    return this.filesService.getUserFileUrl(uuid, user.uuid)
  }
  @Get('user/:uuid')
  @Auth()
  async getUserFile(
    @GetUser() user: User,
    @Param('uuid') uuid: string
  ) {
    return this.filesService.getUserFile(uuid, user.uuid)
  }
}
