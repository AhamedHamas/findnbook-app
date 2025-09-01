import Joi from 'joi';

export const customerSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Enter a valid email address',
    }),
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
  }),
});
