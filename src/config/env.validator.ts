import * as Joi from 'joi';
import { EnvironmentEnum, EnvironmentType } from './enums/config.enum';

export const environmentValidator = Joi.object().keys({
  [EnvironmentEnum.PORT]: Joi.number().required(),
  [EnvironmentEnum.TYPEORM_DATABASE]: Joi.string().trim().required(),
  [EnvironmentEnum.TYPEORM_HOST]: Joi.string().trim().required(),
  [EnvironmentEnum.TYPEORM_PASSWORD]: Joi.string().trim(),
  [EnvironmentEnum.TYPEORM_PORT]: Joi.number().required(),
  [EnvironmentEnum.TYPEORM_SYNCHRONIZE]: Joi.string().trim().required(),
  [EnvironmentEnum.NODE_ENV]: Joi.string()
    .trim()
    .valid(...Object.values(EnvironmentType))
    .required(),
  [EnvironmentEnum.TOKEN_SECRET]: Joi.string().trim().required(),
  [EnvironmentEnum.COOKIE_LIFESPAN_IN_MILLISECONDS]: Joi.number().required(),
});
