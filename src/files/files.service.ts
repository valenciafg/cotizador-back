import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  getStaticUserImage(id: string) {
    const path = join(__dirname, '../../static/uploads/user', id);
    console.log(path);
    if (!existsSync(path)) {
      throw new BadRequestException(`No user image for ${id}`);
    }
    return path;
  }
}
