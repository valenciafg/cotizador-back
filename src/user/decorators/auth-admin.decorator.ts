import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USER_TYPE } from 'src/constants';
import { UserTypeGuard } from '../guards/user-type/user-type.guard';
import { TypeProtected } from './type-protected.decorator';

export function AuthAdmin() {
  return applyDecorators(
    TypeProtected(USER_TYPE.ADMINISTRATOR),
    UseGuards(AuthGuard(), UserTypeGuard),
  );
}
