import { sign } from 'jsonwebtoken'

export function getNewTokenPair (tokenPayload: object): {accessToken: string, refreshToken: string} {
  const accessToken = sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
  const refreshToken = sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })

  return {
    accessToken,
    refreshToken
  }
}
