import * as Joi from 'joi';

export interface User {
    username: string;
    password: string;
    email: string;
  }

 export const createUserSchema  = Joi.object({
    username: Joi.string().min(8).max(30).pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).message('Username must contain at least one uppercase letter, one digit, and one special character').required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().min(4).max(30).pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).message('Password must contain at least one uppercase letter, one digit, and one special character').required(),
  })

  export const updateUserSchema  = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().min(8).max(30).pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).message('Username must contain at least one uppercase letter, one digit, and one special character').required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().min(4).max(30).pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).message('Password must contain at least one uppercase letter, one digit, and one special character').required(),
  })