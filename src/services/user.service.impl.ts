import { sign } from 'jsonwebtoken'
import { PrismaClient, Role, User } from '@prisma/client'

import { hashData } from '../utils/hash'
import { UserService } from './user.service'
import { InternalServerErrorException } from '../httpExceptions/InternalServer.exception'
import { CreateUserDto } from '../validators/user.create.validator'
import { NotFoundException } from '../httpExceptions/notFound.exception'

export class UserServiceImpl implements UserService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  public async createUser ({ email, password, role = Role.USER }: CreateUserDto): Promise<{accessToken: string, refreshToken: string}> {
    try {
      const accessToken = sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
      const refreshToken = sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })

      const hashedPassword = hashData(password)
      // const hashedRefreshToken = hashData(refreshToken)

      await this.prismaClient.user.create({
        data: {
          email,
          role,
          refreshToken,
          password: hashedPassword
        },
        select: {
          refreshToken: true
        }
      })

      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      console.error(`[CreateUser]:  ${error}`)

      throw new InternalServerErrorException(error)
    }
  }

  public async findUserByEmail (email: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new NotFoundException('User already exists')
    }

    return user
  }
}
