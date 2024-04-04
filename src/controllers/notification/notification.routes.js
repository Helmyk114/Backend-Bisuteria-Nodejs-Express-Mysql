const express = require('express');
const { getNotificationWorker, deleteNotification } = require('./notification.controller');
const router = express.Router();

router
      //Ruta para obtener las notificaticiones según el trabajador
      .get('/notificacion/:idCardWorker', getNotificationWorker)

      //Ruta para eliminar una notificacion
      .delete('/notificacion/:idNotification', deleteNotification)

module.exports = router;