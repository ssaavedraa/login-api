import { PrismaClient } from '@prisma/client'

import { ForbiddenException } from '../httpExceptions/forbidden.exception'
import { InternalServerErrorException } from '../httpExceptions/internal.exception'
import { RefreshTokenService } from './refreshToken.service'

export class RefreshTokenServiceImpl implements RefreshTokenService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  public async verifyToken (refreshToken: string): Promise<string> {
    try {
      const user = await this.prismaClient.user.findFirst({
        where: {
          refreshToken: {
            has: refreshToken
          }
        },
        select: {
          email: true
        }
      })

      if (!user) {
        throw new ForbiddenException('forbidden')
      }

      return user.email
    } catch (error) {
      console.error(`[RefreshToken]:  ${error}`)

      if (error instanceof ForbiddenException) {
        return JSON.stringify(error)
      }

      throw new InternalServerErrorException(error)
    }
  }
}
