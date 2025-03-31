import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://vue-ecommerce-app-2lu4.onrender.com/products'

export const adminProductStore = defineStore('product', {
  state: () => ({
    list: []
  }),
  actions: {
    async loadProduct() {
      try {
        const respone = await axios.get(API_URL)
        if (respone.data.length > 0) {
          this.list = respone.data
        }
        else {
          console.warn("No products found")
        }
      }
      catch (error) {
        console.error('Error Fetching products :', error.message)
      }
    },
    async forChartDonut() {



    },
    async addProduct(productData) {
      const data = {
        ...productData,
        remainQuantity: productData.quantity,
        updateAt: new Date().toISOString()
      }
      try {
        const response = await axios.post(API_URL, data)
      }
      catch (error) {
        console.error('Error add product')
      }
    },

    async updateProduct(id, productData) {
      console.log(id)
      const data = {
        ...productData,
        remainQuantity: productData.quantity,
        updateAt: new Date().toISOString()
      }
      try {
        const response = await axios.put(`${API_URL}/${id}`, data)
        console.log("API Response:", response.data)
      }
      catch (error) {
        console.error('Error add product :', error.response?.data || error.message)
      }
    },
    async removeProduct(id) {
      try {
        console.log("Deleting product ID:", id);
        const response = await axios.delete(`${API_URL}/${id}`);

        if (response.status === 201) {
          console.log("Product deleted, updating list...");
          await this.loadProduct()
        }
      } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
      }
    }
  }
})