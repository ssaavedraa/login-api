import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'

import { BadRequestException } from '../httpExceptions/badRequest.exception'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ValidationMiddleware (type: any): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body))
      .then((errors: ValidationError[]) => {
        errors.length > 0
          ? (
              next(new BadRequestException(
                errors.map((error) => Object.values(error.constraints)).join()
              ))
            )
          : next()
      })
  }
}
