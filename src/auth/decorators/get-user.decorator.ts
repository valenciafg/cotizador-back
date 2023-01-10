import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

const decoratorCallback = (data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  if (!user) {
    throw new InternalServerErrorException('User not found (request)');
  }
  return !data ? user : user[data];
};

export const GetUser = createParamDecorator(decoratorCallback);
