import { Router } from 'express'

import { refreshTokenController, userController } from '../controllers/index'
import { ValidationMiddleware } from '../middlewares/validation.middleware'
import { CreateUserDto } from '../validators/user.create.validator'
import { UserCredentials } from '../validators/user.credentials.validator'

const userRouter = Router()

userRouter.post('/', ValidationMiddleware(CreateUserDto), userController.createUser)
userRouter.get('/', userController.findByEmail)
userRouter.post('/login', ValidationMiddleware(UserCredentials), userController.login)
userRouter.get('/refresh', refreshTokenController.refreshToken)

export default userRouter
