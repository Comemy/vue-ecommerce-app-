import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://vue-ecommerce-app-2lu4.onrender.com/'

export const adminOrderStore = defineStore('order', {
  state: () => ({
    list: []
  }),
  actions: {
    async loadOrder() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_URL}orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.list = response.data
        localStorage.setItem('order-list', JSON.stringify(response.data))
      }
      catch (error) {
        console.log('load all order fail')
      }
    },
  }
})