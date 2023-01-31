import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { Knowledge } from './entities';
import { CreateKnowledgeInput, FindKnowledgeInput } from './inputs';

@Injectable()
export class KnowledgeService {
  private readonly logger = new Logger(KnowledgeService.name);
  constructor(
    @InjectModel(Knowledge.name) private knowledgeModel: Model<Knowledge>
  ){}

  async create(createKnowledgeInput: CreateKnowledgeInput): Promise<Knowledge> {
    try {
      const knowledge = await this.knowledgeModel.create({ ...createKnowledgeInput });
      return knowledge;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getKnowledges(): Promise<Knowledge[]> {
    const knowledges = await this.knowledgeModel.find()
    return knowledges
  }
  async findKnowledge(findKnowledgeInput: FindKnowledgeInput): Promise<Knowledge> {
    const knowledge = await this.knowledgeModel.findOne({ ...findKnowledgeInput })
    return knowledge
  }
}
