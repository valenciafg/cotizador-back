import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../common/decorators';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User email',
    nullable: false,
    minLength: 1,
  })
  @IsEmail()
  @MinLength(1)
  @Transform((f) => f.value.toLocaleLowerCase())
  email: string;
  @ApiProperty({ nullable: false })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
  @ApiProperty({ nullable: false })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'Both passwords must be the same' })
  passwordConfirm: string;
  // @IsNumber()
  // @Min(0)
  userType?: number;
}
