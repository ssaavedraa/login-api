import { Router } from 'express'

import { userController } from '../controllers/index'
import { ValidationMiddleware } from '../middlewares/validation.middleware'
import { CreateUserDto } from '../validators/user.create.validator'

const userRouter = Router()

userRouter.post('/', ValidationMiddleware(CreateUserDto), userController.createUser)
userRouter.get('/', userController.checkIfUserExists)

export default userRouter
