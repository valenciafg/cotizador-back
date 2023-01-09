import * as bcrypt from 'bcrypt';
import * as md5 from 'md5';

export const hashPassword = (password: string) => {
  const hashed = md5(password);
  return bcrypt.hashSync(hashed, 10);
};

export const comparePassword = (password: string, savedPassword: string) => {
  const hashed = md5(password);
  const isEqual = bcrypt.compareSync(hashed, savedPassword);
  return isEqual;
};
