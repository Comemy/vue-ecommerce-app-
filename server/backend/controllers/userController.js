const db = require('../db')
const bcrypt = require('bcryptjs')
const moment = require('moment')

const getAllusers = async (req, res) => {
  const result = await db.query('SELECT * FROM users')
  try {
    return res.json(result[0])
  }
  catch (error) {
    return res.status(500).json({ error: ` Error get all users ${error.message}` })
  }
}

const getEachUser = async (req, res) => {
  try {
    const id = req.params.id
    const [result] = await db.query('SELECT id , userImgUrl from users WHERE id = ?', [id])
    console.log('Get user data success')
    return res.json(result[0])
  }
  catch (error) {
    return res.status(500).json({ error: `Error Add user ${error.message}` })
  }
}

const addUser = async (req, res) => {
  const data = req.body
  data.updateAt = moment().format("YYYY-MM-DD HH:mm:ss")
  try {
    console.log(data)
    const hashedPassword = await bcrypt.hash(data.password, 10)
    data.password = hashedPassword
    const result = await db.query('INSERT INTO users SET ?', data)
    return res.status(201).json('Add user Success')
  }
  catch (error) {
    return res.status(500).json({ error: `Error Add user ${error.message}` })
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id
  const data = req.body
  data.updateAt = moment().format(("YYYY-MM-DD HH:mm:ss"))
  try {
    const result = await db.query('UPDATE users SET ? WHERE id = ?', [data, id])
    return res.status(201).json('Update user Success')
  }
  catch (error) {
    return res.status(500).json({ error: `Error Update user ${error.message}` })
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const result = await db.query('DELETE from users WHERE id = ?', id)
    return res.status(201).json('Delete user Success')
  }
  catch (error) {
    return res.status(500).json({ error: `Error delete user ${error.message}` })
  }
}

module.exports = { getAllusers, getEachUser, addUser, updateUser, deleteUser }