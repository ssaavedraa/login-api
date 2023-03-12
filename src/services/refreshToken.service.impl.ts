import { PrismaClient, Role } from '@prisma/client'
import { decode, JwtPayload } from 'jsonwebtoken'
import { userService } from '.'

import { ForbiddenException } from '../httpExceptions/forbidden.exception'
import { RefreshTokenService } from './refreshToken.service'

export class RefreshTokenServiceImpl implements RefreshTokenService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  public async verifyToken (refreshToken: string): Promise<{email: string, role: Role}> {
    const user = await userService.findUserByRefreshToken(refreshToken)

    const decodedToken = decode(refreshToken) as JwtPayload

    if (!user) {
      this.clearRefreshTokens(decodedToken.email)
      throw new ForbiddenException('Wrong token')
    }

    if (user.email !== decodedToken?.email) {
      throw new ForbiddenException('Forbidden')
    }

    return {
      email: user.email,
      role: user.role
    }
  }

  public async clearRefreshTokens (email: string): Promise<void> {
    const user = await this.prismaClient.user.findUnique({
      where: { email }
    })

    user.refreshToken = []

    await this.prismaClient.user.update({
      where: {
        email
      },
      data: {
        ...user
      }
    })
  }
}
