import { Role, User } from '@prisma/client'

import { CreateUserDto } from '../validators/user.create.validator'

export abstract class UserService {
  public abstract createUser({ email, password, role = Role.USER }: CreateUserDto): Promise<{accessToken: string, refreshToken: string}>
  public abstract findUserByEmail(email: string): Promise<User>
}
