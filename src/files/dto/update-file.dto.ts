import { PartialType } from '@nestjs/swagger';
import { FileDto } from './file.dto';

export class UpdateFileDto extends PartialType(FileDto) {}
