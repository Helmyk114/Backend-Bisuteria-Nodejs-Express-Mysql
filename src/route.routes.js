const express = require('express')

//Routes
const sing_in = require('./controllers/sing-in/sing-in.routes')
const products = require('./controllers/products/product.routes')
const worker = require('./controllers/worker/worker.routes')
const client = require('./controllers/client/client.routes')
const orders = require('./controllers/orders/order.routes')
const listwork = require('./controllers/listwork/listwork.routes')
const notification = require('./controllers/notification/notification.routes')

//Combined Routes
const combinedRoutes = express.Router()
combinedRoutes.use('/', sing_in)
combinedRoutes.use('/', products)
combinedRoutes.use('/', worker)
combinedRoutes.use('/', client)
combinedRoutes.use('/', orders)
combinedRoutes.use('/', listwork)
combinedRoutes.use('/', notification)

module.exports = combinedRoutes