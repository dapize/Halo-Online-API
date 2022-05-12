import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

export const hardware = () => {
  const validator = createValidator();
  const bodySchema = Joi.object({
    cpu: Joi.string().required(),
    arc: Joi.string().required(),
    disks: Joi.array().items(Joi.object({
      letter: Joi.string().required(),
      type: Joi.number().required(),
      size: Joi.number().required(),
      free: Joi.number().required(),
    })).required(),
    monitor: Joi.object({
      scaleFactor: Joi.number().required(),
      height: Joi.number().required(),
      width: Joi.number().required()
    }),
    os: Joi.string().required(),
    osType: Joi.string().required(),
    osVersion: Joi.string().required(),
    ram: Joi.number().required(),
    video: Joi.object({
      vram: Joi.number().required(),
      name: Joi.string().required()
    }).required()
  });
  return validator.body(bodySchema);
}
