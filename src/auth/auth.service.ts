import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_TYPE } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { handleRegisterExceptions } from '../utils';
import { LoginUserDto, RegisterOauthUserDto, RegisterUserDto } from './dto';
import { comparePassword, generateJwtToken, hashPassword } from './helpers';
import { IUserTokenResponse } from './interfaces';
import { getUserFullname } from 'src/utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(register: RegisterUserDto): Promise<IUserTokenResponse> {
    const { passwordConfirm, ...data } = register;
    try {
      const isFirstUser = await this.checkFirstUser();
      if (isFirstUser) {
        data.userType = USER_TYPE.ADMINISTRATOR;
        this.logger.log(`Will create an admin user with email ${data.email}`);
      }
      data.password = hashPassword(data.password);
      const user = await this.userModel.create(data);
      const { email, uuid, userType, registerStep } = user;
      const token = generateJwtToken({ email, uuid }, this.jwtService);
      return {
        email,
        uuid,
        registerStep,
        userType,
        token,
      };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async checkFirstUser(registerType = 'credentials'): Promise<boolean> {
    const userCount = await this.userModel.count();
    if (userCount === 0) {
      if (registerType === 'oauth') {
        throw new BadRequestException('The first user cannot be Oauth type');
      }
      return true;
    }
    return false;
  }

  async registerOauth(register: RegisterOauthUserDto) {
    try {
      const authType = 'oauth';
      await this.checkFirstUser(authType);
      const user = await this.userModel.findOne({ email: register.email });
      if (user) {
        if (user.userType === USER_TYPE.ADMINISTRATOR) {
          throw new UnauthorizedException(`Can't get user`);
        }
        const { email, uuid, userType, registerStep } = user;
        const token = generateJwtToken({ email, uuid }, this.jwtService);
        return {
          email,
          uuid,
          registerStep,
          userType,
          token,
        };
      }
      const newUser = await this.userModel.create({
        email: register.email,
        password: '@',
        authType,
        authProvider: register.authProvider,
      });
      const { email, uuid, userType, registerStep } = newUser;
      const token = generateJwtToken({ email, uuid }, this.jwtService);
      return {
        email,
        uuid,
        registerStep,
        userType,
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
    if (!user.status) {
      throw new UnauthorizedException('User unauthorized');
    }

    const token = generateJwtToken(
      { email: user.email, uuid: user.uuid },
      this.jwtService,
    );
    console.log({ token });
    const fullname = getUserFullname(user);
    return {
      email,
      uuid: user.uuid,
      registerStep: user.registerStep,
      userType: user.userType,
      token,
      fullname,
    };
  }

  async checkAuthStatus(user: User) {
    const { email, uuid, registerStep, userType } = user;
    const token = generateJwtToken({ email, uuid }, this.jwtService);
    return {
      email,
      uuid,
      token,
      registerStep,
      userType,
    };
  }
}
