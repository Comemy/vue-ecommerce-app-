const express = require('express')
const router = express.Router()

const { getAllProducts, getEachProduct, addProduct, updateProduct, deleteProduct } = require("../controllers/productController")

// ดึงค่าทั้งหมด 
router.get("/", getAllProducts)

//ดึงค่าแต่ละรายการ
router.get('/:id', getEachProduct)

// Add รายการเพิ่ม 
router.post('/', addProduct)

//แก้ไขรายการ
router.put('/:id', updateProduct)

//ลบรายการ
router.delete('/:id', deleteProduct)

module.exports = router