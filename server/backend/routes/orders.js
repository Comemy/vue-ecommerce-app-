const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authenticateUser')

const { getAllOrders, addOrder, getEachOrder } = require('../controllers/orderController')

router.get('/', authenticateUser, getAllOrders)
router.get('/one', authenticateUser, getEachOrder)
router.post('/', authenticateUser, addOrder)


module.exports = router