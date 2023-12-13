const express = require('express')
const router = express.Router()

const vehicleController = require('../controllers/vehicle.controller')

router.get('/:placa', vehicleController.findByPlate)

module.exports = router