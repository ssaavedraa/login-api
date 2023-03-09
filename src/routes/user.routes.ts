import { Router } from 'express'

import { CreateUserDto } from '../validators/user.create.validator'
import { userController } from '../controllers/index'
import { ValidationMiddleware } from './../middlewares/validation.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'

const userRouter = Router()

userRouter.post('/', ValidationMiddleware(CreateUserDto), userController.createUser)
userRouter.get('/test', authMiddleware, userController.checkIfUserExists)
userRouter.get('/', userController.checkIfUserExists)

export default userRouter
