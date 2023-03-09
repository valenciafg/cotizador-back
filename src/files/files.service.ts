import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';
import { User } from 'src/user/entities/user.entity';
import { File } from './entities/file.entity'
import { S3Provider } from 'src/utils/file-provider';
import { UploadFileDto } from './dto';
import { get } from 'lodash';
import { genUUID } from 'src/utils'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateFile } from './interfaces';
import { IUploadFileProvider } from 'src/interfaces';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FilesService {
  // fileStorageUrl: string;
  s3: S3Provider
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
    private userService: UserService,
    configService: ConfigService
  ) {
    const fileStorageUrl = configService.get('FILESTORAGE_URL')
    this.s3 = new S3Provider({ url: fileStorageUrl })
    this.s3.connect()
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
    return this.s3.upload(key, resource, contentType)
  }

  async createFile(data: ICreateFile) {
    const file = await this.fileModel.findOne({ key: data.key, bucket: data.bucket });
    if (!file) {
      return this.fileModel.create(data)
    }
    await file.updateOne({
      updatedAt: new Date(),
      userId: data.createdBy,
      createdBy: data.createdBy
    })
    return file
  }

  async uploadUserFile(options: UploadFileDto, file: Express.Multer.File, user: User) {
    const extension = this.s3.getExtension(file.mimetype)
    let type = 'user-file'
    let location = `user/${user.uuid}`
    let key = genUUID()
    if (options.isProfile) {
      key = 'profile-pic'
      type = 'profile-pic'
    }
    const uploadResponse = await this.uploadFile(
      `${location}/${key}.${extension}`,
      file.buffer,
      file.mimetype
    ) as IUploadFileProvider;
    const createFileData: ICreateFile = {
      bucket: uploadResponse.bucket,
      key: uploadResponse.key,
      mimeType: uploadResponse.mimeType,
      type,
      createdBy: user.uuid
    }
    const fileResponse = await this.createFile(createFileData)
    console.log({ fileResponse })
    if (options.isProfile) {
      await this.userService.setProfilePic(user.uuid, fileResponse.uuid)
    }
    return createFileData
  }

  async findUserFile(uuid: string, userId: string) {
    const fileResponse = await this.fileModel.findOne({
      uuid,
      userId
    });
    if (!fileResponse) {
      throw new Error('File not found');
    }
    return fileResponse;
  }
  async getUserFileUrl(uuid: string, userId: string){
    try {
      const fileResponse = await this.findUserFile(uuid, userId);
      const extension = this.s3.getExtension(fileResponse.mimeType)
      const fileName = `${uuid}.${extension}`
      const url = await this.s3.signedUrl(fileResponse.key, fileName)
      return { url }  
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getUserFile(uuid: string, userId: string) {
    try {
      const file = await this.findUserFile(uuid, userId);
      const response = await this.s3.download(file.key);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
