import { UserCredentials } from '../validators/user.credentials'

export abstract class AuthService {
  public abstract validateCredentials (credentials: UserCredentials): Promise<string>
}
