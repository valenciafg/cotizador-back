import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './entities';

@Module({
  providers: [ProjectService, ProjectResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
