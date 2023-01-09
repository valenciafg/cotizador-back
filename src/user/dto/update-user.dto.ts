import { PartialType } from '@nestjs/swagger';
import { CreateBasicInformationDto } from './create-basic-information.dto';

export class UpdateUserDto extends PartialType(CreateBasicInformationDto) {}
