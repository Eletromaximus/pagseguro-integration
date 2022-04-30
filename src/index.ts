import express, { application } from 'express'
import cors from 'cors'
import 'express-async-errors'
import helmet from 'helmet'
import fetch from 'node-fetch'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

async function teste () {
  await fetch(
    'https://sandbox.api.pagseguro.com/oauth2/application', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": 'MAXIMUSX',
        "description": 'site de canecas estilosas'
      })
    }
  )
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

app.listen(process.env.PORT || 4000, () => {
  console.log('Bem vindo ao server'),
  teste()
})