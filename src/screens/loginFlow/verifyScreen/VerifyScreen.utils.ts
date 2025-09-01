import Joi from 'joi';

export const otpSchema = Joi.object({
  otp0: Joi.string().length(1).required().messages({
    'string.empty': 'Required',
    'string.length': 'Enter 1 digit',
  }),
  otp1: Joi.string().length(1).required().messages({
    'string.empty': 'Required',
    'string.length': 'Enter 1 digit',
  }),
  otp2: Joi.string().length(1).required().messages({
    'string.empty': 'Required',
    'string.length': 'Enter 1 digit',
  }),
  otp3: Joi.string().length(1).required().messages({
    'string.empty': 'Required',
    'string.length': 'Enter 1 digit',
  }),
});
