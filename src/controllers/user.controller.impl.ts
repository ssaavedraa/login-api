import { NextFunction, Request, Response } from 'express'
import { Role } from '@prisma/client'

import { UserController } from './user.controller'
import { userService } from '../services/index'

export class UserControllerImpl implements UserController {
  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { body } = req

      const result = await userService.createUser(body, Role.USER)

      return res.status(201).send(result)
    } catch (error) {
      console.log(`[UserController]: ${error}`)
      next(error)
    }
  }
}