import { HttpException } from './http.exception'

export class ForbiddenExcception extends HttpException {
  constructor (message: string) {
    super(message, 'Forbidden access', 403)
  }
}
