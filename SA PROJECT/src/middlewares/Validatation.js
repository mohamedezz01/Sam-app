
import joi from 'joi'
const reqMethods = ['body', 'query', 'params', 'headers', 'file', 'files']

export const generalFields = {
  email: joi
    .string()
    .email({ tlds: { allow: ['com', 'net', 'org'] } })  //should email be with top-level domain of ...
    .messages({
      'string.email': 'Email must be a valid email address',
    })
    .required(),
  password: joi  
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) // 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long', 
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long', //message error will be de displayed if not match conditions
    }),
    dateOfBirth: joi.string()
    .pattern(new RegExp('\\d{4}-\\d{2}-\\d{2}')) // Validate 'YYYY-MM-DD' format
    .messages({
      'string.pattern.base': 'DateOfBirth must be in YYYY-MM-DD format',
      'any.required': 'DateOfBirth is required',
    }),
  governorate: joi
    .string()
    .messages({
    'any.required': 'Governorate is required',
    }),
  phone: joi
    .string()
    .pattern(new RegExp('\\d{10}'))
    .messages({
      'string.pattern.base': 'Phone must be 10 digits',
      'any.required': 'Phone is required',
      }),
  
}
export const validationCoreFunction = (schema) => {
  return (req, res, next) => {
    // req
    const validationErrorArr = []
    for (const key of reqMethods) {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        }) // error
        if (validationResult.error) {
          validationErrorArr.push(validationResult.error.details)
        }
      }
    }

    if (validationErrorArr.length) {
      return res
        .status(400)
        .json({ message: 'Validation Error', Errors: validationErrorArr })
    }

    next()
  }
}