export abstract class RefreshTokenService {
  public abstract refreshToken(refreshToken: string): Promise<any>
}