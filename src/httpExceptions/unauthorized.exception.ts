import { HttpException } from './http.exception'

export class UnauthorizedException extends HttpException {
  constructor (message: string) {
    super(message, 'Unauthorized access', 401)
  }
}
