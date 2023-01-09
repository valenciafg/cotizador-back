import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Match } from 'src/decorator';

export class RegisterUserDto {
  @IsEmail()
  @MinLength(1)
  @Transform((f) => f.value.toLocaleLowerCase())
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'Both passwords must be the same' })
  passwordConfirm: string;
  @IsNumber()
  @Min(0)
  userType: number;
}
