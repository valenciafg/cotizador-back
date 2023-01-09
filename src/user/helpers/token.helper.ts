import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../interfaces';

export const generateJwtToken = (payload: IJwtPayload, service: JwtService) => {
  return service.sign(payload);
};
