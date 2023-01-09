import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import {
  CreateBasicInformationDto,
  CreateUserInformationDto,
  LoginUserDto,
  RegisterUserDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from 'src/common/decorators';
import { UserTypeGuard } from './guards/user-type/user-type.guard';
import { USER_TYPE } from 'src/constants';
import { TypeProtected } from './decorators/type-protected.decorator';
import { AuthAdmin } from './decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() register: RegisterUserDto) {
    return this.userService.register(register);
  }

  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.userService.login(user);
  }

  @Post()
  create(@Body() createUserDto: CreateBasicInformationDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('user-information/:id')
  createUserInformation(
    @Body() userInformationDto: CreateUserInformationDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ) {
    return this.userService.createUserInformation(id, userInformationDto);
  }
  /*
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }
  */

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
