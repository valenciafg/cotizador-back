import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { handleRegisterExceptions } from 'src/utils';
import { userStepValidation } from 'src/utils/user-validation';
import {
  CreateBasicInformationDto,
  CreateUserInformationDto,
  LoginUserDto,
  RegisterUserDto,
} from './dto';
import { User } from './entities/user.entity';
import { hashPassword, comparePassword, generateJwtToken } from './helpers';
import { IUserTokenResponse } from './interfaces/user-token-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(register: RegisterUserDto): Promise<IUserTokenResponse> {
    const { passwordConfirm, ...data } = register;
    try {
      data.password = hashPassword(data.password);
      const user = await this.userModel.create(data);
      const { email, uuid } = user;
      const token = generateJwtToken({ email, uuid }, this.jwtService);
      return {
        email,
        uuid,
        token,
      };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async login(userLogin: LoginUserDto) {
    const { email, password } = userLogin;
    const user: User = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    const token = generateJwtToken(
      { email: user.email, uuid: user.uuid },
      this.jwtService,
    );
    return {
      token,
    };
  }

  async checkAuthStatus(user: User) {
    const { email, uuid } = user;
    const token = generateJwtToken({ email, uuid }, this.jwtService);
    return {
      email,
      uuid,
      token,
    };
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
