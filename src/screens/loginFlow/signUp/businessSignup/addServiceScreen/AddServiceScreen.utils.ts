import Joi from 'joi';

export const addServiceSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Service name is required',
    'string.min': 'Service name must be at least 2 characters',
    'string.max': 'Service name must be less than 50 characters',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be at least 0',
    'any.required': 'Price is required',
  }),
});
