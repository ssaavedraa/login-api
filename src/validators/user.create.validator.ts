import { IsEmail, IsString, IsOptional } from 'class-validator'
import { Role } from '@prisma/client'

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public email: string

  @IsString()
  public password: string

  @IsString()
  @IsOptional()
  public role?: Role
}
