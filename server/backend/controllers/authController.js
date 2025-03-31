const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(401).json('Check Email / Password')
  }
  try {
    const [users] = await db.query('SELECT email , id , role , password from users WHERE email = ?', [email])
    if (users.length === 0) {
      return res.status(401).json('incorrect Email')
    }
    const user = users[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json('Password is incorrect')
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    )
    console.log('Login success')

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  }
  catch (error) {
    console.error('Login Fail')
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
module.exports = { loginUser }