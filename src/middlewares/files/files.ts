import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

export const files = () => {
  const validator = createValidator();
  const querySchema = Joi.object({
    language: Joi.string().valid('es', 'en').required()
  });
  return validator.query(querySchema);
}
