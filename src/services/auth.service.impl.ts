import { compareSync } from 'bcrypt'

import { AuthService } from './auth.service'
import { BadRequestException } from '../httpExceptions/badRequest.exception'
import { userService } from './index'
import { UserCredentials } from '../validators/user.credentials'
import { Role } from '@prisma/client'

export class AuthServiceImpl implements AuthService {
  public async validateCredentials (credentials: UserCredentials): Promise<{email: string, role: Role}> {
    const user = await userService.findUserByEmail(credentials.email)

    if (!user) {
      throw new BadRequestException('Wrong credentials')
    }

    const passwordMatch = compareSync(credentials.password, user.password)

    if (!passwordMatch) {
      throw new BadRequestException('Wrong credentials')
    }

    return {
      email: user.email,
      role: user.role
    }
  }
}
