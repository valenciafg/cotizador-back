import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from './entities';
import { handleRegisterExceptions, genUUID } from 'src/utils';
import { CreateChannelInput } from './inputs';

@Injectable()
export class ChannelService {
  private readonly logger = new Logger(ChannelService.name);
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>
  ){}

  async create(createChannelInput: CreateChannelInput): Promise<Channel> {
    try {
      const channel = await this.channelModel.create({ ...createChannelInput });
      return channel;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
}