const express = require('express')
const router = express.Router()

const { getAllusers, getEachUser, addUser, updateUser, deleteUser } = require('../controllers/userController')

//CRUD Router

router.get('/', getAllusers)
router.get('/:id', getEachUser)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router