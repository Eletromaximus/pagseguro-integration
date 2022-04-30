import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import helmet from 'helmet'
import fetch from 'node-fetch'
import 'dotenv'

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

async function teste () {
  await fetch(
    'https://sandbox.api.pagseguro.com/oauth2/application', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + process.env.APP_KEY
      },
      body: JSON.stringify({
        name: 'MAXIMUS',
        description: 'site de canecas estilosas'
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