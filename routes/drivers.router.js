const express = require('express')
const router = express.Router()

const driversController = require('../controllers/drivers.controller')

router.get('/', driversController.getAll)
router.get('/:cnh', driversController.findByCnh)
router.get('/:cnh/endereco', driversController.findByCnhWithAddress)

router.post('/', driversController.create)
router.put('/:cnh', driversController.update)

module.exports = router