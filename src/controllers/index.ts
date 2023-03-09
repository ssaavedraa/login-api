import { UserControllerImpl } from './user.controller.impl'
import { RefreshTokenControllerImpl } from './refreshToken.controller.impl';

const userController = new UserControllerImpl()
const refreshTokenController = new RefreshTokenControllerImpl()

export {
  userController,
  refreshTokenController
}
