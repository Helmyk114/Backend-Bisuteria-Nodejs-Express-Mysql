const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const { urlencoded, json } = require('express')
const bodyParser = require('body-parser');

//Port
const port = process.env.PORT || 3004

//Server initialization
const app = express()

app.use('/uploads', express.static('uploads'));

//setting
app.set('port', port)

//Middlewars
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

//Controllers
const products = require('./components/products/product.routes')
const worker = require('./components/worker/worker.routes')

//Routes
app.use('/IRis', products)
app.use('/IRis', worker)


module.exports = app