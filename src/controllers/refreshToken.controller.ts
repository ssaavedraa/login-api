import { NextFunction, Request, Response } from 'express'

export abstract class RefreshTokenController {
  public abstract refreshToken (req: Request, res: Response, next: NextFunction): Promise<Response>
}
