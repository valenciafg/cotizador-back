import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserTypeGuard } from '../guards/user-type.guard';
import { TypeProtected } from './type-protected.decorator';

export function Auth(...types: number[]) {
  return applyDecorators(
    TypeProtected(...types),
    UseGuards(AuthGuard('jwt'), UserTypeGuard),
  );
}
