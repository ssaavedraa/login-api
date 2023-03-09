import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { ForbiddenExcception } from '../httpExceptions/forbidden.exception'
import { UnauthorizedException } from '../httpExceptions/unauthorized.exception'

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedException('Authorization header not provided')
  }

  const token = authHeader.split(' ')[1]

  verify(token, process.env.ACCESS_TOKEN_SECRET, (error: any, decoded: { email: Promise<any>; }) => {
    if (error) {
      throw new ForbiddenExcception('Invalid access Token')
    }

    next()
  })
}
