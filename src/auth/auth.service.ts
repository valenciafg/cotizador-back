import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_TYPE } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { handleRegisterExceptions } from '../utils';
import { LoginUserDto, RegisterUserDto } from './dto';
import { comparePassword, generateJwtToken, hashPassword } from './helpers';
import { IUserTokenResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register(register: RegisterUserDto): Promise<IUserTokenResponse> {
    const { passwordConfirm, ...data } = register;
    try {
      const userCount = await this.userModel.count();
      if (userCount === 0) {
        data.userType = USER_TYPE.ADMINISTRATOR;
      }
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
      console.log(error);
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
}
