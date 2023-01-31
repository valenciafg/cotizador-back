import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { Heading } from './entities';
import { CreateHeadingInput, FindHeadingInput } from './inputs';

@Injectable()
export class HeadingService {
  private readonly logger = new Logger(HeadingService.name);
  constructor(
    @InjectModel(Heading.name) private headingModel: Model<Heading>
  ){}

  async create(createHeadingInput: CreateHeadingInput): Promise<Heading> {
    try {
      const heading = await this.headingModel.create({ ...createHeadingInput });
      return heading;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getHeadings(): Promise<Heading[]> {
    const headings = await this.headingModel.find()
    return headings
  }
  async findHeading(findHeadingInput: FindHeadingInput): Promise<Heading> {
    const heading = await this.headingModel.findOne({ ...findHeadingInput })
    return heading
  }
}
