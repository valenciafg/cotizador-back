import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleRegisterExceptions = (error: any) => {
  if (error.code === 11000) {
    throw new BadRequestException(
      `Record exists in db ${JSON.stringify(error.keyValue)}`,
    );
  }
  console.log(error);
  throw new InternalServerErrorException(
    `Can't perform action - Check server logs`,
  );
};
