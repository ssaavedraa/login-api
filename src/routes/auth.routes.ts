import { Router } from 'express'

import { authController, refreshTokenController } from '../controllers'
import { ValidationMiddleware } from '../middlewares/validation.middleware'
import { UserCredentials } from '../validators/user.credentials'

const authRouter = Router()

authRouter.post('/login', ValidationMiddleware(UserCredentials), authController.login)
authRouter.get('/refresh', refreshTokenController.refreshToken)

export default authRouter
