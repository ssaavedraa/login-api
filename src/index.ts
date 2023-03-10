import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

import { Server } from './server/server'

dotenv.config()

const corsOptions: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
  origin: 'http://127.0.0.1:5173',
  preflightContinue: false
}

const server = new Server()

server.useCors(corsOptions)
server.useRouter()
server.useErrorMiddleware()
server.listen()
