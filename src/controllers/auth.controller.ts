import { NextFunction, Request, Response } from 'express'

export abstract class AuthController {
  public abstract login(req: Request, res: Response, next: NextFunction): Promise<Response>
}
