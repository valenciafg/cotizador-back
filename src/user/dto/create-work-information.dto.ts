import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { USER_TYPE } from '../../constants';

export class CreateWorkInformationDto {
  @IsString()
  @ValidateIf((f) => f.userType === USER_TYPE.PROFESSIONAL)
  profession: string;
  @IsString()
  @ValidateIf((f) => f.userType === USER_TYPE.PROFESSIONAL)
  specialty: string;
  @ValidateIf((f) => f.userType === USER_TYPE.PROFESSIONAL)
  knowledge: string[];
  @ArrayNotEmpty()
  @IsArray()
  currentCompanies: string[];
  @IsOptional()
  @IsArray()
  workedCompanies: string[];
  @IsOptional()
  @IsArray()
  workedProjects: string[];
  @ValidateIf(
    (f) =>
      f.userType === USER_TYPE.COMPANY ||
      f.userType === USER_TYPE.CONTRACTOR_SUPPLIER,
  )
  @ArrayNotEmpty()
  @IsArray()
  services: string[];
  @ValidateIf((f) => f.userType === USER_TYPE.COMPANY)
  @ArrayNotEmpty()
  @IsArray()
  headings: string[];
  @Min(0)
  @IsNumber()
  userType: number;
}
