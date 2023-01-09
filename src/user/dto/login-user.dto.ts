import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MinLength(1)
  @Transform((f) => f.value.toLocaleLowerCase())
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
