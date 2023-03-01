export abstract class HttpException {
  message: string
  status: number
  exception: string

  constructor (message: string, exception: string, status: number) {
    this.exception = exception
    this.status = status
    this.message = message
  }
}
