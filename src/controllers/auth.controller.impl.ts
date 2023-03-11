import { NextFunction, Request, Response } from 'express'

import { AuthController } from './auth.controller'
import { authService } from '../services'
import { getNewTokenPair } from '../utils/jwt'

export class AuthControllerImpl implements AuthController {
  public async login (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const credentials = req.body

      const { email, role } = await authService.validateCredentials(credentials)

      const { accessToken, refreshToken } = getNewTokenPair({ email, role })

      return res
        .cookie(
          'refreshToken',
          refreshToken,
          {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 60 * 60 * 1000
          }
        )
        .status(201)
        .send({ accessToken })
    } catch (error) {
      console.error(`[AuthController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }
}
