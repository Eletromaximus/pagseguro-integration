import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import helmet from 'helmet'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

app.listen(process.env.PORT || 4000, () => {
  console.log('Bem vindo ao server')
})