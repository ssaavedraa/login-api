import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import express, { Application, json } from 'express'

import { errorHandlerMiddleware } from '../middlewares/error.middleware'
import userRouter from '../routes/user.routes'

export class Server {
  private app: Application
  private port: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT || '3001'
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(json())
    this.app.use(cookieParser())
  }

  listen () {
    this.app.listen(this.port, () => console.debug('Server listening at port: ', this.port))
  }

  useRouter () {
    this.app.use('/user', userRouter)
  }

  useErrorMiddleware () {
    this.app.use(errorHandlerMiddleware)
  }

  useCors (corsOptions: CorsOptions) {
    this.app.use(cors(corsOptions))
  }
}
