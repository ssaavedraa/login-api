import { HttpException } from './http.exception'

export class ForbiddenException extends HttpException {
  constructor (message: string) {
    super(message, 'Forbidden access', 403)
  }
}
