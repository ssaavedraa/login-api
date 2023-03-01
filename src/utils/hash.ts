import { genSaltSync, hashSync } from 'bcrypt'

export function hashData (data: string): string {
  const saltRounds = 10
  const salt = genSaltSync(saltRounds)
  const hash = hashSync(data, salt)

  return hash
}
