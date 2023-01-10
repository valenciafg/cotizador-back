import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @MinLength(1)
  @Transform((f) => f.value.toLocaleLowerCase())
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
