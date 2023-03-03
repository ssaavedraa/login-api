import { PrismaClient, Role } from '@prisma/client'

import { hashData } from '../utils/hash'
import { UserService } from './user.service'
import { CreateUserDto } from './../validators/user.create.validator'
import { InternalServerErrorException } from '../httpExceptions/InternalServer.exception'
import { BadRequestException } from '../httpExceptions/badRequest.exception'

export class UserServiceImpl implements UserService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  async createUser ({ email, password, role = Role.USER }: CreateUserDto): Promise<string> {
    try {
      const hashedPassword = hashData(password)

      await this.prismaClient.user.create({
        data: {
          email,
          role,
          password: hashedPassword
        }
      })

      return 'Welcome to hex!'
    } catch (error) {
      console.error(`[CreateUser]:  ${error}`)

      throw new InternalServerErrorException(error)
    }
  }

  async findUserByEmail (email: string): Promise<boolean> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email
      }
    })

    if (user) {
      throw new BadRequestException('User already exists')
    }

    return !!user
  }
}
