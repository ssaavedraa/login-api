import { AuthControllerImpl } from './auth.controller.impl'
import { RefreshTokenControllerImpl } from './refreshToken.controller.impl'
import { UserControllerImpl } from './user.controller.impl'

const userController = new UserControllerImpl()
const refreshTokenController = new RefreshTokenControllerImpl()
const authController = new AuthControllerImpl()

export {
  userController,
  refreshTokenController,
  authController
}
