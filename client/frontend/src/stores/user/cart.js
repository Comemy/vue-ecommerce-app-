import { defineStore } from "pinia"
import axios from "axios"

const API_URL = 'https://vue-ecommerce-app-2lu4.onrender.com'

export const userCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    checkoutList: {}
  }),
  getters: {
    sumquantity(state) {
      if (Array.isArray(state.items)) {
        let sum = 0
        for (let i = 0; i < state.items.length; i++) {
          sum += Number(state.items[i].quantity)
        }
        return sum
      }
      else {
        return 0
      }
    }

  },
  actions: {
    loadCart() {
      try {
        const cartData = JSON.parse(localStorage.getItem('cart-items'))
        this.items = Array.isArray(cartData) ? cartData : []
      } catch (error) {
        this.items = []
      }
    },
    addtoCart(productData) {
      const index = this.items.findIndex(item => item.name === productData.name && item.about === productData.about && item.price === productData.price)
      if (index !== -1) {
        this.items[index].quantity = this.items[index].quantity + 1
        localStorage.setItem('cart-items', JSON.stringify(this.items))
      }
      else {
        this.items.push(productData)
        localStorage.setItem('cart-items', JSON.stringify(this.items))
      }
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity
      localStorage.setItem('cart-items', JSON.stringify(this.items))
    },
    removeProduct(index) {
      this.items.splice(index, 1)
      localStorage.setItem('cart-items', JSON.stringify(this.items))
    },

    sumPrice() {
      let sum = 0
      this.items.forEach(data => {
        sum += data.price * data.quantity
      })
      return sum
    },
    async checkout(checkoutData) {
      let checkoutAll = {
        ...checkoutData,
        totalPrice: this.sumPrice(),
        createdAt: (new Date()).toLocaleString(),
        orderNumber: `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
        products: this.items
      }
      this.checkoutList = checkoutAll
      localStorage.setItem('check-out', JSON.stringify(this.checkoutList))

      try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${API_URL}/orders`, checkoutAll, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.checkoutList = response.data

        // ใช้แก้ไขกรณีโหลดข้อมูลไม่ทัน render ไม่ต้องใช่้ router.push ที่หน้า CheckoutView
        window.location.href = `/success?orderNumber=${checkoutAll.orderNumber}`

        return response.data

      }
      catch (error) {
        console.error('Add order Fail')
      }
    },
    async getOrderDetail(orderNumber) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_URL}/orders/one?orderNumber=${orderNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return response.data
      }
      catch (error) {
        console.error('get order fail')
      }
    }
  }
})