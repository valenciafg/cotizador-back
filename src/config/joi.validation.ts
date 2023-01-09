import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_URI: Joi.required(),
  PORT: Joi.number().default(3000),
  HOST_API: Joi.required().default('http://localhost:3000/api'),
});
