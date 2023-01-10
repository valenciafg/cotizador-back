import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validTypes: number[] = this.reflector.get(
      'types',
      context.getHandler(),
    );
    if (!validTypes) return true;
    if (validTypes.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (!user) {
      throw new BadRequestException('Must send a valid token');
    }
    if (validTypes.includes(user.userType)) {
      return true;
    }
    throw new ForbiddenException('User type is invalid');
  }
}
