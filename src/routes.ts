import Router from 'express'
import { CartsController } from './controllers/CartsController'
import { TransactionsController } from './controllers/TransactionsController'
import { CobrancaController } from './controllers/CobrancaController'

const cartsController = new CartsController()
const transactionsController = new TransactionsController()
const cobrancaController = new CobrancaController()

const routes = Router()

routes.get('/carts', cartsController.index)
routes.post('/carts', cartsController.create)
routes.put('/carts/:id', cartsController.update)
routes.delete('/carts/:id', cartsController.destroy)

routes.post('/transactions', transactionsController.create)
routes.post('/cobranca', cobrancaController.create)

export { routes }
