const express = require('express')
const router = express.Router()

const policemanController = require('../controllers/policeman.controller')

router.get('/num/:num', policemanController.findByNum)
router.get('/nome/:nome', policemanController.findByNome)

module.exports = router