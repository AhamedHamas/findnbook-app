import Joi from 'joi';

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Enter a valid email address',
    }),
});
