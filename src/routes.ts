import Router from 'express'
import { UseCases } from './UseCases'

const cases = new UseCases()

const routers = Router()

routers.post('/createApp', (req, res) => {
  return cases.createApp(req, res)
})

export { routers }
