import { PrismaClient, Role, User } from '@prisma/client'
import { compareSync } from 'bcrypt'

import { BadRequestException } from '../httpExceptions/badRequest.exception'
import { InternalServerErrorException } from '../httpExceptions/internal.exception'
import { NotFoundException } from '../httpExceptions/notFound.exception'
import { UserService } from './user.service'
import { hashData } from '../utils/hash'
import { getNewTokenPair } from '../utils/jwt'
import { CreateUserDto } from '../validators/user.create.validator'
import { UserCredentials } from '../validators/user.credentials.validator'

export class UserServiceImpl implements UserService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  public async createUser ({ email, password, role = Role.USER }: CreateUserDto): Promise<{accessToken: string, refreshToken: string}> {
    try {
      const { accessToken, refreshToken } = getNewTokenPair({ email, role })

      const hashedPassword = hashData(password)

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

  public async validateCredentials (credentials: UserCredentials): Promise<{email: string, role: Role}> {
    const user = await this.findUserByEmail(credentials.email)

    if (!user) {
      throw new BadRequestException('Wrong credentials')
    }

    const passwordMatch = compareSync(credentials.password, user.password)

    if (!passwordMatch) {
      throw new BadRequestException('Wrong credentials')
    }

    return {
      email: user.email,
      role: user.role
    }
  }
}
