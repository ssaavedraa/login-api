import { NextFunction, Request, Response } from 'express'

import { UserController } from './user.controller'
import { userService } from '../services/index'

export class UserControllerImpl implements UserController {
  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { body } = req

      const result = await userService.createUser(body)

      return res.status(201).send(result)
    } catch (error) {
      console.error(`[UserController]: ${JSON.stringify(error)}`)
      next(error)
    }
  }
}
