import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const decoratorCallback = (data, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
};

export const CurrentUser = createParamDecorator(decoratorCallback);
