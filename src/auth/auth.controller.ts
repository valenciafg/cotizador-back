import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RawHeaders } from 'src/common/decorators';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Auth, AuthAdmin, GetUser } from './decorators';
import { LoginUserDto, RegisterOauthUserDto, RegisterUserDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User was created' })
  register(@Body() register: RegisterUserDto) {
    return this.authService.register(register);
  }

  @Post('register-oauth')
  @ApiResponse({ status: 201, description: 'User was created' })
  registerOauth(@Body() register: RegisterOauthUserDto) {
    return this.authService.registerOauth(register);
  }

  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Get('check-auth')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @AuthAdmin()
  testing(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    // console.log({ user, email, rawHeaders });
    return {
      ok: true,
      message: 'Hola from private',
    };
  }
}
