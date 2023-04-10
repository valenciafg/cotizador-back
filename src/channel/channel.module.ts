import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './entities';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ChannelService, ChannelResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Channel.name,
        schema: ChannelSchema
      }
    ]),
    UserModule
  ],
  exports: [ChannelService]
})
export class ChannelModule {}
