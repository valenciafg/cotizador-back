import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions, genUUID } from '../utils';
import { Heading } from './entities';
import { CreateHeadingInput, FindHeadingInput } from './inputs';

@Injectable()
export class HeadingService {
  private readonly logger = new Logger(HeadingService.name);
  constructor(
    @InjectModel(Heading.name) private headingModel: Model<Heading>,
  ) {}

  async create(createHeadingInput: CreateHeadingInput): Promise<Heading> {
    try {
      const heading = await this.headingModel.create({ ...createHeadingInput });
      return heading;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getHeadings(uuidList?: string[]): Promise<Heading[]> {
    if (!uuidList) {
      const headings = await this.headingModel.find().sort({ createdAt: -1 });
      return headings;
    }
    const headings = await this.headingModel
      .find({
        uuid: {
          $in: uuidList,
        },
      })
      .sort({ createdAt: -1 });
    return headings;
  }
  async findHeading(findHeadingInput: FindHeadingInput): Promise<Heading> {
    const heading = await this.headingModel.findOne({ ...findHeadingInput });
    return heading;
  }
  async findOrCreate(name: string) {
    const doc = await this.headingModel.findOne({
      name: name.toLocaleLowerCase(),
    });
    if (doc) {
      return doc;
    }
    return this.headingModel.create({
      uuid: genUUID(),
      name: name.toLocaleLowerCase(),
    });
  }
}
