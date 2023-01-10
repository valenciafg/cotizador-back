import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateBasicInformationDto, CreateUserInformationDto } from './dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('type/:userType')
  @Auth()
  setType(
    @GetUser() user: User,
    @Param('userType', ParseIntPipe) userType: number,
  ) {
    return this.userService.setType(user, userType);
  }

  @Patch('info/basic')
  @Auth()
  setBasicInformation(
    @GetUser() user: User,
    @Body() basicInfo: CreateBasicInformationDto,
  ) {
    return this.userService.setBasicInformation(user, basicInfo);
  }
  @Patch('info/general')
  @Auth()
  setGeneralInformation(
    @GetUser() user: User,
    @Body() userInfo: CreateUserInformationDto,
  ) {
    return this.userService.setGeneralInformation(user, userInfo);
  }
  // @Post()
  // create(@Body() createUserDto: CreateBasicInformationDto) {
  //   return this.userService.create(createUserDto);
  // }
  /*
  @Patch('user-information/:id')
  createUserInformation(
    @Body() userInformationDto: CreateUserInformationDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ) {
    return this.userService.createUserInformation(id, userInformationDto);
  }
  */
}
