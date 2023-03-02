import { Role } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  public email: string

  @IsString()
  public password: string

  @IsString()
  @IsOptional()
  public role?: Role
}
