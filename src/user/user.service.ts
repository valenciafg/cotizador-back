import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { userStepValidation } from 'src/utils/user-validation';
import { CreateBasicInformationDto, CreateUserInformationDto } from './dto';
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

  async create(createBasicInformationDto: CreateBasicInformationDto) {
    try {
      const user = await this.userModel.create(createBasicInformationDto);
      return user;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async createUserInformation(id, userInformation: CreateUserInformationDto) {
    const user = await this.getUserById(id);
    const { registerStep, userType } = user;
    userStepValidation(registerStep, 1);
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
