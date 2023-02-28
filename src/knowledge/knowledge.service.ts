import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions, genUUID } from 'src/utils';
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
  async getKnowledges(uuidList?: string[]): Promise<Knowledge[]> {
    if(!uuidList) {
      const knowledges = await this.knowledgeModel.find()
      return knowledges
    }
    const knowledges = await this.knowledgeModel.find({ uuid: {
      "$in": uuidList
    }})
      return knowledges
  }
  async findKnowledge(findKnowledgeInput: FindKnowledgeInput): Promise<Knowledge> {
    const knowledge = await this.knowledgeModel.findOne({ ...findKnowledgeInput })
    return knowledge
  }
  async findOrCreate(name: string) {
    const doc = await this.knowledgeModel.findOne({ name: name.toLocaleLowerCase()})
    if (doc) {
      return doc;
    }
    return this.knowledgeModel.create({
      uuid: genUUID(),
      name: name.toLocaleLowerCase(),
    });
  }
}
