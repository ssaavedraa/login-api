import { PrismaClient } from '@prisma/client';
import { RefreshTokenService } from "./refreshToken.service";
import { ForbiddenExcception } from "../httpExceptions/forbidden.exception";
import { InternalServerErrorException } from '../httpExceptions/InternalServer.exception';

export class RefreshTokenServiceImpl implements RefreshTokenService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  public async refreshToken(refreshToken: string): Promise<string> {
    try {
      const email = await this.prismaClient.user.findFirst({
        where: {
          refreshToken: {
            has: refreshToken
          }
        },
        select: {
          email: true
        }
      })

      if (!email) {
        throw new ForbiddenExcception('forbidden')
      }

      return `${email}`
    } catch (error) {
      console.error(`[RefreshToken]:  ${error}`)

      throw new InternalServerErrorException(error)
    }
  }
}