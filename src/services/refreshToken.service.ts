export abstract class RefreshTokenService {
  public abstract verifyToken(refreshToken: string): Promise<any>
}
