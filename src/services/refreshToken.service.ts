import { Role } from '@prisma/client'

export abstract class RefreshTokenService {
  public abstract verifyToken(refreshToken: string): Promise<{email: string, role: Role}>
  public abstract clearRefreshTokens(email: string): Promise<void>
}
