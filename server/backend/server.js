const express = require('express');
const promise = require('promise')
const cors = require('cors')
const db = require('./db')
const port = process.env.PORT
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/orders')
const uploadRoutes = require('./routes/upload')
app.use("/products", productRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/orders', orderRoutes)
app.use('/upload', uploadRoutes)


app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`))

