import { BadRequestException } from '@nestjs/common';
import { get, has } from 'lodash';
import { USER_TYPE } from '../../constants';
import { CreateBasicInformationDto } from '../dto';
import { User } from '../entities/user.entity';

const PERSONAL_TYPES = [
  USER_TYPE.ADMINISTRATOR,
  USER_TYPE.CLIENT,
  USER_TYPE.PROFESSIONAL,
];

const COMMERCIAL_TYPES = [USER_TYPE.COMPANY, USER_TYPE.CONTRACTOR_SUPPLIER];

export const userStepValidation = (user: User, validStep) => {
  const currentRegisterStep = get(user, 'registerStep', 1);
  if (currentRegisterStep !== validStep) {
    throw new BadRequestException('User with invalid register step');
  }
};

export const equalUserTypeValidation = (user: User, userType: number) => {
  if (user.userType !== userType) {
    throw new BadRequestException('Must send a valid userType');
  }
};
/*
export const basicInfoFieldValidation = (
  userType: number,
  basicInfo: CreateBasicInformationDto,
) => {
  if (PERSONAL_TYPES.includes(userType)) {
    if (!has(basicInfo, 'name') || !has(basicInfo, 'lastName')) {
      throw new BadRequestException('Must send name and lastName');
    }
  }
  if (COMMERCIAL_TYPES.includes(userType)) {
    if (!has(basicInfo, 'businessName') || !has(basicInfo, 'comercialName')) {
      throw new BadRequestException('Must send businessName and comercialName');
    }
  }
};
*/
