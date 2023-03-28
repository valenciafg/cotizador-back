import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { Post } from './entities/post.entity';
import { CreatePostInput, FindPostInput } from './inputs';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>
  ){}
  async create(createPostInput: CreatePostInput, createdBy: string): Promise<Post> {
    try {
      const data = { ...createPostInput, createdBy }
      const post = await this.postModel.create(data);
      return post;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getPosts(createdBy?: string): Promise<Post[]> {
    const filter: any = {}
    if (createdBy) {
      filter.createdBy = createdBy;
    }
    const posts = await this.postModel.find(filter).sort({ createdAt: -1 })
    return posts
  }

  async deletePost(uuid: string): Promise<boolean> {
    try {
      const response = await this.postModel.deleteOne({ uuid })
      if (response.deletedCount === 0) {
        throw new Error(`Post ${uuid} not found`)
      }
      return true
    } catch (error) {
      this.logger.error(error)
      console.log(error.message)
      return false
    }
  }
  async findPost(findCityInput: FindPostInput): Promise<Post> {
    const post = await this.postModel.findOne({ ...findCityInput })
    return post
  }
}
