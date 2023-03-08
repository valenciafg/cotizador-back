import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';
import { S3Provider } from 'src/utils/file-provider';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  fileStorageUrl: string;
  constructor(
    configService: ConfigService
  ) {
    this.fileStorageUrl = configService.get('FILESTORAGE_URL')
  }
  getStaticUserImage(id: string) {
    const path = join(__dirname, '../../static/uploads/user', id);
    console.log(path);
    if (!existsSync(path)) {
      throw new BadRequestException(`No user image for ${id}`);
    }
    return path;
  }
  async uploadFile(key: string, resource: Buffer, contentType: string) {
    const s3 = new S3Provider({ url: this.fileStorageUrl })
    s3.connect()
    return s3.upload(key, resource, contentType)
  }
}
