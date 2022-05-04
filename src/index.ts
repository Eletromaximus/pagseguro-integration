import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import helmet from 'helmet'
import 'dotenv/config'
import { routers } from './routes'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

app.use(routers)

const server = app.listen(process.env.PORT || 4000)
  .on('listening', () => {
    console.log('Bem vindo ao server')
  })

process.on('SIGINT', (code) => {
  server.close(() => {
    console.log('fechando server', code)
  })
})
