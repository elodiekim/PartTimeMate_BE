import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  // STATE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  // DB_PORT: Joi.string().default(3306),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
