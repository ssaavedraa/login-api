import express, { Application, json } from 'express'
import bodyParser from 'body-parser'

import userRouter from '../routes/user.routes'
import { errorHandlerMiddleware } from '../middlewares/error.middleware'

export class Server {
  private app: Application
  private port: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT || '3001'
    this.app.use(json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  listen () {
    this.app.listen(this.port, () => console.log('Server listening at ', this.port))
  }

  useRouter () {
    this.app.use('/', userRouter)
  }

  useErrorMiddleware () {
    this.app.use(errorHandlerMiddleware)
  }
}
