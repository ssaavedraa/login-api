import { Role } from '@prisma/client'
import { UserCredentials } from '../validators/user.credentials'

export abstract class AuthService {
  public abstract validateCredentials (credentials: UserCredentials): Promise<{email: string, role: Role}>
}
