import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { ForbiddenExcception } from '../httpExceptions/forbidden.exception'
import { UnauthorizedException } from '../httpExceptions/unauthorized.exception'

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedException('Authorization header not provided')
  }

  const token = authHeader.split(' ')[1]

  verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      throw new ForbiddenExcception('Invalid access Token')
    }

    console.log((decoded as JwtPayload).email)

    next()
  })
}
