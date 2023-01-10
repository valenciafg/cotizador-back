import { SetMetadata } from '@nestjs/common';

export const META_TYPES = 'types';

export const TypeProtected = (...args: number[]) => {
  return SetMetadata(META_TYPES, args);
};
