import { NextFunction, Request, Response } from 'express'

import { UnauthorizedException } from '../httpExceptions/unauthorized.exception'
import { RefreshTokenController } from './refreshToken.controller'
import { refreshTokenService } from '../services'
import { getNewTokenPair } from './../utils/jwt'

export class RefreshTokenControllerImpl implements RefreshTokenController {
  public async refreshToken (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const cookies = req.cookies

      if (!cookies?.refreshToken) {
        throw new UnauthorizedException('Refresh token cookie not found')
      }

      const refreshToken = cookies.refreshToken
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true })

      const { email, role } = await refreshTokenService.verifyToken(refreshToken)

      const { accessToken } = getNewTokenPair({ email, role })

      return res.send({ accessToken })
    } catch (error) {
      console.error(`[RefreshTokenController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }
}
