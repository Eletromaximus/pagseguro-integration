import { Request, Response } from 'express'
import HttpRest from '../utils/HttpRest'

interface IErros {
  code: number,
  description: string,
  parameter_name: string
}
export class UseCases {
  async createApp (req: Request, res: Response) {
    const { name, description } = req.body

    try {
      const response = await HttpRest(
        'https://sandbox.api.pagseguro.com/oauth2/application', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.MY_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            description
          })
        }
      )

      if (response.error_messages) {
        const errors: IErros[] = response.error_messages

        return res.status(400).json(errors)
      }

      return res.send(response).status(200)
    } catch (errors: any) {
      return res.status(500).json({
        message: errors.message || 'Unexpected error'
      })
    }
  }
}
