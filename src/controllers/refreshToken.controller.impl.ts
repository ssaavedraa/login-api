import { NextFunction, Request, Response } from 'express'
import { decode, JwtPayload } from 'jsonwebtoken'

import { ForbiddenException } from '../httpExceptions/forbidden.exception'
import { UnauthorizedException } from '../httpExceptions/unauthorized.exception'
import { RefreshTokenController } from './refreshToken.controller'
import { refreshTokenService } from '../services'
import { getNewTokenPair } from './../utils/jwt'

export class RefreshTokenControllerImpl implements RefreshTokenController {
  public async refreshToken (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const cookies = req.cookies

      if (!cookies?.refreshToken) {
        throw new UnauthorizedException('Unauthorized')
      }

      const refreshToken = cookies.refreshToken

      const { email, role } = await refreshTokenService.verifyToken(refreshToken)
      const decodedToken = decode(refreshToken) as JwtPayload

      if (email !== decodedToken?.email) {
        throw new ForbiddenException('Forbidden')
      }

      const { accessToken } = getNewTokenPair({ email, role })

      return res.send({ accessToken })
    } catch (error) {
      console.error(`[RefreshTokenController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }
}
