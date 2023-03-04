import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator'
import { Role } from '@prisma/client'

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public email: string

  @IsString()
  public password: string

  @IsString()
  @IsOptional()
  @IsEnum(Role)
  public role?: Role
}
