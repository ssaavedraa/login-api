import { HttpException } from './http.exception'

export class InternalServerErrorException extends HttpException {
  constructor (message: string) {
    super(message, 'Internal Server Error Exception', 500)
  }
}
