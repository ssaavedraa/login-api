import { RefreshTokenControllerImpl } from './refreshToken.controller.impl'
import { UserControllerImpl } from './user.controller.impl'

const userController = new UserControllerImpl()
const refreshTokenController = new RefreshTokenControllerImpl()

export {
  userController,
  refreshTokenController
}
