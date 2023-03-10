import { Role } from '@prisma/client'
import { IsString, IsOptional, IsEnum } from 'class-validator'

import { UserCredentials } from './user.credentials'

export class CreateUserDto extends UserCredentials {
  @IsString()
  @IsOptional()
  @IsEnum(Role)
  public role?: Role
}
