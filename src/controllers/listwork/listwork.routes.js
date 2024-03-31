const express = require("express");
const router = express.Router()
const { createListwork, getListwork, getListworkStatus, getListworkStatusIdCardWorker, getDetailListWork, updateStateWorkList } = require("./listwork.controller");

router
        //Ruta para crear una lista de trabajo
        .post('/listaTrabajo', createListwork)

        //Ruta para obtener la información de una lista de trabajo
        // .get('/listaTrabajo/:idOrderDetail', getListwork)
        //Ruta para obtener las listas de trabajo según su estado
        .get('/listaTrabajo-Estado/:idState', getListworkStatus)
        //Ruta para obtener las listas de trabajo según su estado y el id del trabajador
        .get('/listaTrabajo-Estado-Trabajador/:idState/:idCardWorker', getListworkStatusIdCardWorker)
        //Ruta para obtener el detalle de una lista de trabajo según del id de la lista
        .get('/detalleListaTrabajo/:idWorkList', getDetailListWork)

        //Ruta para cambiar el estado de una lista de trabajo
        .put('/listaTrabajo-CambiarEstado/:idWorkList/:idState', updateStateWorkList)

module.exports = router;