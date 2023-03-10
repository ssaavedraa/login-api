import { NextFunction, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { authService } from '../services'

import { AuthController } from './auth.controller'

export class AuthControllerImpl implements AuthController {
  public async login (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const credentials = req.body

      const email = await authService.validateCredentials(credentials)

      const accessToken = sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
      const refreshToken = sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })

      return res
        .cookie(
          'refreshToken',
          refreshToken,
          {
            httpOnly: true,
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
