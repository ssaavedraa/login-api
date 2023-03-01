import { NextFunction, Request, Response } from 'express'

import { HttpException } from '../httpExceptions/http.exception'

export function errorHandlerMiddleware (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(err.status || 500).send(err)
}
