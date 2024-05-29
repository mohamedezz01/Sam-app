
import joi from 'joi'
import { generalFields } from '../../middlewares/Validatation.js'


export const SignUpSchema = {
  body: joi
    .object({
    FirstName: joi
        .string()
        .min(2)
        .max(10)
        .messages({
          
          'string.min': 'FirstName must be at least 2 characters long',
          'string.max': 'FirstName must be at most 10 characters long',
          'string.base': 'FirstName must be a string',
          'any.required': 'FirstName is required',
        }),
    LastName:joi
          .string()
          .min(2)
          .max(10)
          .messages({
            'string.min': 'LastName must be at least 2 characters long',
            'string.max': 'LastName must be at most 10 characters long',
            'string.base': 'LastName must be a string',
            'any.required': 'LastName is required',
          }),
    Email: generalFields.email,
    Password: generalFields.password,
    ConfirmPassword: joi.valid(joi.ref('Password')).messages({
      'any.only': 'Passwords do not match',
      }),
    DateOfBirth: generalFields.dateOfBirth,
    Governorate: generalFields.governorate,
    Phone: generalFields.phone
    })
    .required(),
  
}

export const ChangePass = {
  body: joi
    .object({
      Email: generalFields.email,
      Password: generalFields.password,
      newPassword: generalFields.password
    }).required()
}

export const ChangeInfo = {
  body: joi.object({
    FirstName: joi
      .string()
      .min(2)
      .max(10)
      .messages({
        'string.min': 'FirstName must be at least 2 characters long',
        'string.max': 'FirstName must be at most 10 characters long',
        'string.base': 'FirstName must be a string',
      }).optional(),
    LastName: joi
      .string()
      .min(2)
      .max(10)
      .messages({
        'string.min': 'LastName must be at least 2 characters long',
        'string.max': 'LastName must be at most 10 characters long',
        'string.base': 'LastName must be a string',
      }).optional(),
    DateOfBirth: joi
      .string()
      .pattern(new RegExp('\\d{4}-\\d{2}-\\d{2}')) // Validate 'YYYY-MM-DD' format
  .messages({
    'string.pattern.base': 'DateOfBirth must be in YYYY-MM-DD format',
      }).optional(),

   Phone: joi
      .string()
      .pattern(new RegExp('\\d{10}'))
      .messages({
        'string.pattern.base': 'Phone must be 10 digits',
      }).optional(),
    Governorate: joi.string().optional(),
  }).required(),
};