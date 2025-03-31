import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = 'http://localhost:5000/products'

export const userProductStore = defineStore('product', {
  state: () => ({
    list: []
  }),
  actions: {
    async loadProduct() {
      try {
        const response = await axios.get(API_URL)
        response.data.map(product => product.quantity = 1)
        this.list = response.data.filter(product => product.status === 'open');
      }
      catch (error) {
        console.error('Load Product Fail : ', error.response?.data || error.message)
      }

    }

  }
})