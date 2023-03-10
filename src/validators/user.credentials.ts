import { IsEmail, IsString } from 'class-validator'

export class UserCredentials {
  @IsString()
  @IsEmail()
  public email: string

  @IsString()
  public password: string
}
