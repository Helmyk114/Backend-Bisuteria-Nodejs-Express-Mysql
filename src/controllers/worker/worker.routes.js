const express = require('express')
const router = express.Router()
const { getWorker ,createWorker, updateWorker, profile, activateInactiveWorker, getActivateInactiveWorker } = require('./worker.controller')
const { workerUpload } = require('../../config/multer')
const { getSellerCrastman, getBank, getCrastman } = require('./formWorker.controller')

router
        //Ruta para obtener a todos los trabajadores según su estado
        .get('/trabajador/Activo-Inactivo/:idState', getActivateInactiveWorker)
        //Ruta para obtener la informacion de un trabajador
        .get('/trabajadores/:idCardWorker', getWorker)
        //Ruta para obtener el perfil de un trabajador
        .get('/perfil/:idCardWorker', profile)

        //Ruta para insertar un nuevo trabajador a la base de datos
        .post('/trabajador', workerUpload.single('photo'),createWorker)

        //Ruta para actualizar la informacion de un trabajador
        .put('/trabajadores/:idCardWorker', workerUpload.single('photo'), updateWorker)
        //Ruta para cambiar el estado de un trabajador
        .put('/trabajador/Activo-Inactivo/:idCardWorker/:idState', activateInactiveWorker)


        //Ruta para obtener el rol de artesano y vendedor
        .get('/artesano-vendedor', getSellerCrastman)
        //Ruta para obtener los bancos
        .get('/bancos', getBank)
        //Ruta para obtener los artesanos que estan activos
        .get('/artesano-Activo', getCrastman)

module.exports = router