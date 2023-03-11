import { PrismaClient, Role } from '@prisma/client'

import { ForbiddenException } from '../httpExceptions/forbidden.exception'
import { RefreshTokenService } from './refreshToken.service'

export class RefreshTokenServiceImpl implements RefreshTokenService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  public async verifyToken (refreshToken: string): Promise<{email: string, role: Role}> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        refreshToken: {
          has: refreshToken
        }
      },
      select: {
        email: true,
        role: true
      }
    })

    if (!user) {
      throw new ForbiddenException('forbidden')
    }

    return {
      email: user.email,
      role: user.role
    }
  }
}
