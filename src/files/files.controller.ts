import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/user/decorators';
import { USER_TYPE } from 'src/constants';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('user/:id')
  findUserImage(@Res() res: Response, @Param('id') id: string) {
    const path = this.filesService.getStaticUserImage(id);
    /*
    res.status(403).json({
      ok: false,
      path,
    });
    */
    res.sendFile(path);
  }

  @Get('user/profile')
  findUserProfileImage() {
    return null;
  }

  @Post('user')
  @Auth()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      storage: diskStorage({
        destination: './static/uploads/user',
        filename: fileNamer,
      }),
      limits: {
        fileSize: 5000000,
      },
    }),
  )
  uploadUserFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('The file is not a image');
    }
    const fileUrl = `${this.configService.get('HOST_API')}/files/user/${
      file.filename
    }`;
    return { fileUrl };
  }
}
