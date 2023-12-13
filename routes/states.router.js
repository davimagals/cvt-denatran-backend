const express = require('express')
const router = express.Router()

const statesController = require('../controllers/states.controller')

router.get('/', statesController.getAll)

module.exports = router