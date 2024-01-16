import * as Joi from 'joi';
import { EnvironmentEnum } from './enums/config.enum';

export const environmentValidator = Joi.object().keys({
  [EnvironmentEnum.PORT]: Joi.number().required(),
});
