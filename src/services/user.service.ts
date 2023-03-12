import { Role, User } from '@prisma/client'

import { CreateUserDto } from '../validators/user.create.validator'
import { UserCredentials } from '../validators/user.credentials.validator'

export abstract class UserService {
  public abstract createUser({ email, password, role = Role.USER }: CreateUserDto): Promise<{accessToken: string, refreshToken: string}>
  public abstract findUserByEmail(email: string): Promise<User>
  public abstract findUserByRefreshToken(refreshToken: string): Promise<User>
  public abstract validateCredentials (credentials: UserCredentials): Promise<{email: string, role: Role}>
  public abstract updateUser (userData: User): Promise<void>
}
