import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities';
import { ChannelModule } from 'src/channel/channel.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [MessageService, MessageResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    ChannelModule,
    UserModule,
  ],
  exports: [MessageService],
})
export class MessageModule {}
