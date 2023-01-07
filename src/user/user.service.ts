import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { CreateUserInformationDto } from './dto/create-user-information.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUserById(id: string) {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async createUserInformation(id, userInformation: CreateUserInformationDto) {
    const user = await this.getUserById(id);
    const { registerStep, userType } = user;
    if (registerStep !== 1) {
      throw new BadRequestException('User with invalid register step');
    }
    try {
      await user.updateOne({
        ...userInformation,
        registerStep: 2,
      });
      return { ...user.toJSON(), ...userInformation };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Must send a valid ID');
    }
    return this.getUserById(id);
  }
}
