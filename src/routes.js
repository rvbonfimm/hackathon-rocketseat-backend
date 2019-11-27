const { Router } = require('express')

const routes = Router()

const FormController = require('./app/controllers/FormController')

routes.get('/', (req, res) => {
  res.json({ ok: true })
})

routes.get('/api/home', (req, res) => {
  res.json({ message: 'hello, world!!!' });
})

routes.get('/api/contact', FormController.index)

routes.post('/api/contact', FormController.store)

module.exports =  routes
