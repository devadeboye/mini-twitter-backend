import * as Joi from 'joi';
import { EnvironmentEnum } from './enums/config.enum';

export const environmentValidator = Joi.object().keys({
  [EnvironmentEnum.PORT]: Joi.number().required(),
  [EnvironmentEnum.TYPEORM_DATABASE]: Joi.string().trim().required(),
  [EnvironmentEnum.TYPEORM_HOST]: Joi.string().trim().required(),
  [EnvironmentEnum.TYPEORM_PASSWORD]: Joi.string().trim(),
  [EnvironmentEnum.TYPEORM_PORT]: Joi.number().required(),
  [EnvironmentEnum.TYPEORM_SYNCHRONIZE]: Joi.string().trim().required(),
  [EnvironmentEnum.TYPEORM_USERNAME]: Joi.string().trim().required(),
});
