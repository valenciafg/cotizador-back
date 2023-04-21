import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities';
import { handleRegisterExceptions } from '../utils';
import { CreateMessageInput, FindMessagesInput } from './inputs';
import { User } from 'src/user/entities/user.entity';
import { USER_TYPE } from '../constants';
import { ChannelService } from '../channel/channel.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private channelService: ChannelService,
  ) {}

  async create(
    createMessageInput: CreateMessageInput,
    userId: string,
  ): Promise<Message> {
    try {
      const message = await this.messageModel.create({
        ...createMessageInput,
        userId,
      });
      return message;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async getMessages(user: User, input: FindMessagesInput) {
    if (user.userType !== USER_TYPE.ADMINISTRATOR) {
      const channel = await this.channelService.getChannel({
        uuid: input.channelId,
        users: [user.uuid],
      });
      if (!channel) {
        throw Error('User not found in this channel');
      }
    }
    return this.messageModel
      .find({
        ...input,
      })
      .sort({ createdAt: -1 });
  }
}
