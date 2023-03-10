import { NextFunction, Request, Response } from 'express'

import { userService } from '../services/index' // create new instance of service in contructor
import { UserController } from './user.controller'

export class UserControllerImpl implements UserController {
  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { body } = req

      const { accessToken, refreshToken } = await userService.createUser(body)

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
      console.error(`[UserController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }

  public async checkIfUserExists (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { email } = req.query

      const result = await userService.findUserByEmail(`${email}`)

      return res.send(result)
    } catch (error) {
      console.error(`[UserController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }
}
