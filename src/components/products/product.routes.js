const express = require('express')
const router = express.Router()
const { getAllProduct, getProduct ,createProduct, updateProduct ,deleteProduct ,bancostodos } = require('./product.controller')
const { productUpload } = require('../../config/multer')

router
        .get('/productos', getAllProduct)
        .get('/productos/:idProducto', getProduct)
        .post('/producto', productUpload.single('image'),createProduct)
        .put('/productos/:idProducto', updateProduct)
        .delete('/productos/:idProducto', deleteProduct)

        .get('/banco', bancostodos)
