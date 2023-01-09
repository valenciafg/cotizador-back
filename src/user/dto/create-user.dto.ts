import { Transform } from 'class-transformer';
import { IsString, Min, IsNumber, ValidateIf } from 'class-validator';
import { USER_TYPE } from '../../constants';

const PERSONAL_TYPES = [
  USER_TYPE.ADMINISTRATOR,
  USER_TYPE.CLIENT,
  USER_TYPE.PROFESSIONAL,
];

const COMMERCIAL_TYPES = [USER_TYPE.COMPANY, USER_TYPE.CONTRACTOR_SUPPLIER];

export class CreateUserDto {
  @IsString()
  @ValidateIf((f) => PERSONAL_TYPES.includes(f.userType))
  @Transform((f) => f.value.toLocaleLowerCase())
  name: string;
  @IsString()
  @ValidateIf((f) => PERSONAL_TYPES.includes(f.userType))
  @Transform((f) => f.value.toLocaleLowerCase())
  lastName: string;
  @IsString()
  @ValidateIf((f) => COMMERCIAL_TYPES.includes(f.userType))
  @Transform((f) => f.value.toLocaleLowerCase())
  businessName: string;
  @IsString()
  @ValidateIf((f) => COMMERCIAL_TYPES.includes(f.userType))
  @Transform((f) => f.value.toLocaleLowerCase())
  comercialName: string;
}
