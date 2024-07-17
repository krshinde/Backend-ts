import { Request,Response,NextFunction } from 'express';
import joi, { ObjectSchema,ValidationErrorItem } from 'joi';
import * as user_auth_validation from './user_auth_validation'

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
          return res.status(400).json({
              status: false,
              message: 'Validation error',
              errors: error.details.map((detail: ValidationErrorItem) => detail.message),
          });
      }
      req.body = value;
      next();
  };
};
  
export {user_auth_validation}

