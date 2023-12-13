const express = require('express')
const router = express.Router()

const infractionController = require('../controllers/infraction.controller')

router.get('/', infractionController.getAll)
router.get('/num/:num', infractionController.findByNum)
router.get('/cnh/:cnh', infractionController.findByCnh)

module.exports = router