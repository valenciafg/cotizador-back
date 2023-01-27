import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterOauthUserDto {
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
  @MinLength(1)
  authProvider: string;
}
