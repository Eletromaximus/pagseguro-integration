import Router from 'express'
// import { UseCases } from './UseCases'
import { CartsController } from './controllers/CartsController'

// const cases = new UseCases()
const cartsController = new CartsController()

const routes = Router()

// routes.post('/createApp', (req, res) => {
//   return cases.createApp(req, res)
// })

routes.get('/carts', (req, res) => {
  return cartsController.index(req, res)
})

routes.post('/carts', (req, res) => {
  return cartsController.create(req, res)
})

routes.put('/carts/:id', (req, res) => {
  return cartsController.update(req, res)
})

routes.delete('/carts/:id', (req, res) => {
  return cartsController.destroy(req, res)
})

export { routes }
