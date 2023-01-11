import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProfileInformationDto {
  @IsNumberString()
  @MinLength(5)
  @MaxLength(15)
  phone: string;
  @IsNumberString()
  @MinLength(1)
  @MaxLength(5)
  phoneCode: string;
  @IsOptional()
  @IsNumberString()
  @MinLength(5)
  @MaxLength(15)
  optionalPhone: string;
  @IsOptional()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(5)
  optionalPhoneCode: string;
  @IsOptional()
  @IsUrl()
  websiteUrl: string;
  @IsOptional()
  @IsUrl()
  facebookUrl: string;
  @IsOptional()
  @IsUrl()
  instagramUrl: string;
  @IsOptional()
  @IsUrl()
  twitterUrl: string;
  @IsOptional()
  @IsUrl()
  tiktokUrl: string;
  @IsOptional()
  @IsString()
  @MinLength(1)
  extraInformation: string;
  @Min(0)
  @IsNumber()
  userType: number;
}
