import { defineStore } from "pinia"
import axios from "axios"

const API_URL = 'https://vue-ecommerce-app-2lu4.onrender.com/users'

export const adminUserStore = defineStore('user', {
  state: () => ({
    list: [],
    userlist: []
  }),
  actions: {
    async loadUser() {
      try {
        const response = await axios.get(API_URL)
        console.log(response.data)
        this.list = response.data
        this.userlist = response.data.filter(user => user.role === 'user')

      }
      catch (error) {
        console.error('Error update user')
      }
    },
    async addUsertoServer(userData) {
      const data = userData
      try {
        const response = await axios.post(API_URL, data)
        console.log('Add user success')
      }
      catch (error) {
        console.error('Error add user')
      }

    },
    async updateUsertoServer(userData, id) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, userData)
        console.log('update success')
      }
      catch (error) {
        console.log('update user error')
        console.error('Error update user')
      }
    }
  }
})