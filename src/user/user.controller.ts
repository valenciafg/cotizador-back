import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreateBasicInformationDto, CreateUserInformationDto } from './dto';
import { User } from './entities/user.entity';
import { RawHeaders } from 'src/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
