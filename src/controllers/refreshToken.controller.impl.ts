import { NextFunction, Request, Response } from 'express'
import { decode, JwtPayload, sign } from 'jsonwebtoken'

import { RefreshTokenController } from './refreshToken.controller'
import { ForbiddenException } from '../httpExceptions/forbidden.exception'
import { UnauthorizedException } from '../httpExceptions/unauthorized.exception'
import { refreshTokenService } from '../services'

export class RefreshTokenControllerImpl implements RefreshTokenController {
  public async refreshToken (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const cookies = req.cookies

      if (!cookies?.refreshToken) {
        throw new UnauthorizedException('Unauthorized')
      }

      const refreshToken = cookies.refreshToken

      const email = await refreshTokenService.verifyToken(refreshToken)
      const decodedToken = decode(refreshToken) as JwtPayload

      if (email !== decodedToken?.email) {
        throw new ForbiddenException('Forbidden')
      }

      const accessToken = sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })

      return res.send({ accessToken })
    } catch (error) {
      console.error(`[RefreshTokenController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }
}
