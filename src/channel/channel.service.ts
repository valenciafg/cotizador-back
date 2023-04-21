import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { get } from 'lodash';
import { Channel } from './entities';
import { handleRegisterExceptions } from '../utils';
import { CreateChannelInput, FindChannelInput } from './inputs';

@Injectable()
export class ChannelService {
  private readonly logger = new Logger(ChannelService.name);
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
  ) {}

  async create(createChannelInput: CreateChannelInput): Promise<Channel> {
    try {
      const channel = await this.channelModel.create({ ...createChannelInput });
      return channel;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async getChannels(users?: string[]) {
    if (!users) {
      return this.channelModel.find().sort({ createdAt: -1 });
    }
    return this.channelModel
      .find({
        users: {
          $in: users,
        },
      })
      .sort({ createdAt: -1 });
  }

  async getChannel(input: FindChannelInput) {
    const where: any = {
      uuid: input.uuid,
    };
    const users: string[] = get(input, 'users', []);
    if (users.length > 0) {
      where.users = {
        $in: users,
      };
    }
    return this.channelModel.findOne(where);
  }
}
