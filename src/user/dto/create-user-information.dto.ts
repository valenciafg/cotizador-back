import {
  IsString,
  IsNumber,
  IsLatitude,
  IsLongitude,
  ValidateIf,
  Min,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { USER_TYPE } from '../../constants';

export class CreateUserInformationDto {
  @IsNumberString()
  @ValidateIf(
    (f) =>
      f.userType === USER_TYPE.PROFESSIONAL ||
      f.userType === USER_TYPE.CONTRACTOR_SUPPLIER,
  )
  dni: string;
  @IsNumberString()
  @ValidateIf(
    (f) =>
      f.userType === USER_TYPE.COMPANY ||
      f.userType === USER_TYPE.CONTRACTOR_SUPPLIER,
  )
  ruc: string;
  @IsString()
  description: string;
  @IsNumber()
  cityId: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsLongitude()
  @IsOptional()
  latitude?: number;
  @IsLatitude()
  @IsOptional()
  longitude?: number;
  @Min(0)
  @IsNumber()
  userType: number;
}
