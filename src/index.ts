import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import helmet from 'helmet'
import 'dotenv/config'
import HttpRest from './utils/HttpRest'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

async function teste () {
  const response = await HttpRest(
    'https://sandbox.api.pagseguro.com/oauth2/application', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": 'Mdddddf',
        "description": 'site de canecas estilosas muito locas'
      })
    }
  )

  console.log(response)
}

app.listen(process.env.PORT || 4000, () => {
  console.log('Bem vindo ao server')
  teste()
})