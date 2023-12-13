const express = require('express')
const router = express.Router()

const addressController = require('../controllers/address.controller')

router.get('/:id', addressController.findById)

module.exports = router