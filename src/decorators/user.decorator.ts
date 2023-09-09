import { createParamDecorator } from '@nestjs/common';

export const AuthUserId = createParamDecorator((_data, req) => {
  return req.user._id;
});
