const db = require('../db')
const moment = require('moment')

const getAllOrders = async (req, res) => {
  try {
    const [result] = await db.query('SELECT *  from orders')
    if (result.length === 0) {
      return res.status(403).json({ message: 'Forbidden: Order not found or access denied' })
    }

    const allorders = []

    for (let i = 0; i < result.length; i++) {
      const orders = result[i]
      const [items] = await db.query(
        `SELECT 
        order_items.quantity,
        order_items.price,
        products.imageUrl,
        products.name
        FROM order_items
        JOIN products ON order_items.product_id = products.id
        WHERE order_items.order_id =?`,
        [orders.id]
      )
      orders.products = items
      orders.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
      allorders.push(orders)
    }

    console.log('get product to orders')
    return res.json(allorders)
  }

  catch (error) {
    return res.status(500).json('Get All orders Fail')
  }

}

const getEachOrder = async (req, res) => {
  const { orderNumber } = req.query
  const userId = req.user.id

  try {
    const [result] = await db.query('SELECT * from orders WHERE orderNumber = ? AND userId = ?', [orderNumber, userId])

    if (result.length === 0) {
      return res.status(403).json({ message: 'Forbidden: Order not found or access denied' })
    }

    const order = result[0]
    const [items] = await db.query(
      `SELECT 
       order_items.quantity,
       order_items.price,
       products.imageUrl,
       products.name
       FROM order_items
       JOIN products ON order_items.product_id = products.id
       WHERE order_items.order_id =?`,
      [order.id]
    )

    order.products = items
    return res.status(201).json(order)
  }
  catch (error) {
    return res.status(500).json('Get each order Fail')
  }
}

const addOrder = async (req, res) => {
  try {
    let data = req.body
    let orderItem = data.products
    data.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")

    // ตัด products ออกจาก order
    delete data.products

    // Insert orders table
    const userId = req.user.id
    data.status = data.paymentMethod === 'Credit Card' ? 'Payment Completed' : 'Waiting for Pay'
    data.userId = userId
    const [orderResult] = await db.query('INSERT INTO orders SET ?', data)
    const orderId = orderResult.insertId

    // Insert order_items table
    for (let item of orderItem) {
      await db.query('INSERT INTO order_items SET ?', {
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })
      // ลด remainQuantity
      await db.query('UPDATE products SET remainQuantity = remainQuantity - ? WHERE id = ? ', [item.quantity, item.id])
    }
    return res.status(201).json('Add order success')
  }
  catch (error) {
    return res.status(500).json('Add order error')
  }
}

module.exports = { getAllOrders, addOrder, getEachOrder }