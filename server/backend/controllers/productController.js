const moment = require('moment')
const { errorMessages } = require('vue/compiler-sfc')
const db = require('../db')

const getAllProducts = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM products")
    await db.query('ALTER TABLE products AUTO_INCREMENT = 1')
    result.map(product => product.updateAt = moment().format("YYYY-MM-DD HH:mm:ss"))
    return res.json(result)
  }

  catch (error) {
    return res.status(500).json('error get products')
  }
}

const getEachProduct = async (req, res) => {
  try {
    const id = req.params.id
    const [result] = await db.query('SELECT * FROM products WHERE id =?', [id])
    return res.json(result)
  }
  catch (error) {
    return res.status(500).json('error get each product')
  }
}

const addProduct = async (req, res) => {
  let data = req.body
  data.updateAt = moment().format("YYYY-MM-DD HH:mm:ss")
  try {
    const result = await db.query('INSERT INTO products SET ?', data)
    return res.status(201).json({ message: 'Product Add Success' })
  }
  catch (error) {
    return res.status(500).json('Error adding product')
  }
}

const updateProduct = async (req, res) => {
  try {
    const data = req.body
    data.updateAt = moment().format("YYYY-MM-DD HH:mm:ss")
    const id = req.params.id
    const result = await db.query('UPDATE products SET ? WHERE id =?', [data, id])
    console.log(result[0])
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.status(201).json({ message: 'Update Product Success' })
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const result = await db.query('DELETE from products WHERE id = ?', [id])
    if (result[0].affectedRows === 0) {
      return res.status(201).json({ error: 'Can not find delete Product' })
    }
    await db.query('ALTER TABLE products AUTO_INCREMENT = 1')
    return res.status(201).json({ message: 'Delete Product Success' })

  }
  catch (error) {
    return res.status(500).json({ error: error.messages })
  }
}

module.exports = { getAllProducts, getEachProduct, addProduct, updateProduct, deleteProduct }