import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const decoratorCallback = (data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.rawHeaders;
};

export const RawHeaders = createParamDecorator(decoratorCallback);
