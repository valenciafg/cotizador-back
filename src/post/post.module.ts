import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { Post, PostSchema } from './entities/post.entity';
import { FilesModule } from 'src/files/files.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [PostResolver, PostService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
    FilesModule,
    UserModule,
  ],
})
export class PostModule {}
