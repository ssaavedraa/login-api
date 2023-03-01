import { NextFunction, Request, Response } from 'express'

export abstract class UserController {
  public abstract createUser (req: Request, res: Response, next: NextFunction): Promise<Response>
}
