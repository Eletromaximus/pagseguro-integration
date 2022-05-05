import { Response, Request } from 'express'
import Cart from '../models/Cart'

export class CartsController {
  async index (req: Request, res: Response) {
    try {
      const carts = await Cart.find()
      return res.status(200).json(carts)
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal server error.'
      })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { code, price } = req.body

      const cart = await Cart.create({ code, price })

      return res.status(201).json(cart)
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal server error.'
      })
    }
  }
}
