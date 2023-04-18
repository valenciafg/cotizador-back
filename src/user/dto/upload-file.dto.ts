import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  isProfile: boolean;
}
