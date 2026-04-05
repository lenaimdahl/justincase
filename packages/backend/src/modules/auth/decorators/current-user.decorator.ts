import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {UserDocument} from 'src/modules/users/schemas/user.schema';

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserDocument;
});
