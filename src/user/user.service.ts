import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { get } from 'lodash';
import { handleRegisterExceptions } from 'src/utils';
import { equalUserTypeValidation, userStepValidation } from './helpers';
import {
  CreateBasicInformationDto,
  CreateProfileInformationDto,
  CreateUserInformationDto,
  CreateWorkInformationDto,
} from './dto';
import { User } from './entities/user.entity';
import { REGISTER_STEPS, USER_TYPE } from 'src/constants';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async setType(user: User, userType: number) {
    const currentUserType = get(user, 'userType', -1);
    if (currentUserType === 0) {
      throw new BadRequestException('User already have type');
    }
    userStepValidation(user, REGISTER_STEPS.USER_TYPE);
    const validUserTypes = [
      USER_TYPE.PROFESSIONAL,
      USER_TYPE.COMPANY,
      USER_TYPE.CONTRACTOR_SUPPLIER,
    ];
    if (!validUserTypes.includes(userType)) {
      throw new BadRequestException(`Invalid type ${userType}`);
    }
    try {
      await user.updateOne({
        userType,
        registerStep: REGISTER_STEPS.BASIC_INFO,
      });
      return { ok: true, message: `User updated with type: ${userType}` };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async setBasicInformation(user: User, basicInfo: CreateBasicInformationDto) {
    equalUserTypeValidation(user, basicInfo.userType);
    userStepValidation(user, REGISTER_STEPS.BASIC_INFO);
    delete basicInfo.userType;
    try {
      await user.updateOne({
        ...basicInfo,
        registerStep: REGISTER_STEPS.USER_INFO,
      });
      return { ok: true, message: 'Basic information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async setGeneralInformation(user: User, userInfo: CreateUserInformationDto) {
    equalUserTypeValidation(user, userInfo.userType);
    userStepValidation(user, REGISTER_STEPS.USER_INFO);
    delete userInfo.userType;
    try {
      await user.updateOne({
        ...userInfo,
        registerStep: REGISTER_STEPS.WORK_INFO,
      });
      return { ok: true, message: 'General information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async setWorkInformation(user: User, workInfo: CreateWorkInformationDto) {
    equalUserTypeValidation(user, workInfo.userType);
    userStepValidation(user, REGISTER_STEPS.WORK_INFO);
    delete workInfo.userType;
    try {
      await user.updateOne({
        ...workInfo,
        registerStep: REGISTER_STEPS.PROFILE_INFO,
      });
      return { ok: true, message: 'Work information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async setProfileInformation(
    user: User,
    profileInfo: CreateProfileInformationDto,
  ) {
    equalUserTypeValidation(user, profileInfo.userType);
    userStepValidation(user, REGISTER_STEPS.PROFILE_INFO);
    delete profileInfo.userType;
    try {
      await user.updateOne({
        ...profileInfo,
        registerStep: REGISTER_STEPS.FINISHED,
      });
      return { ok: true, message: 'Profile information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

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

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Must send a valid ID');
    }
    return this.getUserById(id);
  }

  getUserByUUID(uuid: string) {
    return this.userModel.findOne({ uuid })
  }
}
