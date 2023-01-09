import { genUUID } from 'src/utils';

/* eslint-disable @typescript-eslint/ban-types */
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) {
    return callback(new Error('File is empty'), false);
  }
  const fileExtension = file.mimetype.split('/')[1];
  const generatedNamed = genUUID();
  const fileName = `${generatedNamed}.${fileExtension}`;
  callback(null, fileName);
};
