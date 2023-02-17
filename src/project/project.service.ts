import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { Project } from './entities';
import { CreateProjectInput, FindProjectInput } from './inputs/project.input';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ){}

  async create(createServiceInput: CreateProjectInput): Promise<Project> {
    try {
      const project = await this.projectModel.create({ ...createServiceInput });
      return project;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async getProjects(): Promise<Project[]> {
    const projects = await this.projectModel.find()
    return projects
  }
  async findProject(findProjectInput: FindProjectInput): Promise<Project> {
    const project = await this.projectModel.findOne({ ...findProjectInput })
    return project
  }
}
