const { Router } = require('express')

const routes = Router()

const UserController = require('./app/controllers/UserController')
const FormController = require('./app/controllers/FormController')

routes.get('/', (req, res) => {
  res.json({ ok: true })
})

routes.get('/users', UserController.index)

routes.post('/users', UserController.store)

routes.put('/users/:id', UserController.update)

routes.get('/forms', FormController.index)

routes.post('/forms', FormController.store)

module.exports =  routes
