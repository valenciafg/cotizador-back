import { IsString, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class CreateUserInformationDto {
  @IsString()
  dni: string;
  @IsString()
  ruc: string;
  @IsString()
  description: string;
  @IsNumber()
  cityId: string;
  @IsString()
  address: string;
  @IsLongitude()
  latitude: number;
  @IsLatitude()
  longitude: number;
}
