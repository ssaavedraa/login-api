import { HttpException } from './http.exception'

export class BadRequestException extends HttpException {
  constructor (message: string) {
    super(message, 'Bad Request Exception', 400)
  }
}
