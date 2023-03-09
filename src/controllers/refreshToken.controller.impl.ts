import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { RefreshTokenController } from "./refreshToken.controller";
import { ForbiddenExcception } from '../httpExceptions/forbidden.exception';
import { UnauthorizedException } from "../httpExceptions/unauthorized.exception";
import { refreshTokenService } from "../services";

export class RefreshTokenControllerImpl implements RefreshTokenController {
  public async refreshToken (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const cookies = req.cookies

    if (!cookies?.refreshToken) {
      throw new UnauthorizedException('Unauthorized')
    }

    const refreshToken = cookies.refreshToken

    try {
      console.log("🚀 ~ file: refreshToken.controller.impl.ts:21 ~ RefreshTokenControllerImpl ~ refreshToken ~ email:", refreshToken)
      const email = await refreshTokenService.refreshToken(refreshToken)

      verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error: any, decoded: { email: string }) => {
          if (error || email !== decoded.email) {
            throw new ForbiddenExcception('Forbidden')
          }
        }
        )
        const accessToken = sign({email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })

        return res.send({ accessToken })
    } catch (error) {
      console.error(`[RefreshTokenController]: ${JSON.stringify(error)}`)
      next(error)
    }

  }
}