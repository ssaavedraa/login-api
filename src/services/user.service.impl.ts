import { PrismaClient, Role } from '@prisma/client'

import { hashData } from '../utils/hash'
import { BadRequestException } from '../httpExceptions/badRequest.exception'
import { UserService } from './user.service'
import { CreateUserDto } from './../validators/user.create.validator'

export class UserServiceImpl implements UserService {
  private prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  async createUser ({ email, password }: CreateUserDto, role: Role): Promise<string> {
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

      throw new BadRequestException(error)
    }
  }
}
