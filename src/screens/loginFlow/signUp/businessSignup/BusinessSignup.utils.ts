import Joi from 'joi';

export const businessSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Owner name is required',
  }),
  businessName: Joi.string().required().messages({
    'string.empty': 'Business name is required',
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
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
  }),
  openingTime: Joi.string().required().messages({
    'string.empty': 'Opening time is required',
  }),
  closingTime: Joi.string().required().messages({
    'string.empty': 'Closing time is required',
  }),
  workingDays: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one working day',
    'any.required': 'Working days are required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
  }),
});
