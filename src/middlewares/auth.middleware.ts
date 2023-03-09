import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.sendStatus(401)
  }

  const token = authHeader.split(' ')[1]

  verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.sendStatus(403)
    }

    console.log((decoded as JwtPayload).email)

    next()
  })
}
