import { UserControllerImpl } from './user.controller.impl'
import { RefreshTokenControllerImpl } from './refreshToken.controller.impl'
import { AuthControllerImpl } from './auth.controller.impl'

const userController = new UserControllerImpl()
const refreshTokenController = new RefreshTokenControllerImpl()
const authController = new AuthControllerImpl()

export {
  userController,
  refreshTokenController,
  authController
}
