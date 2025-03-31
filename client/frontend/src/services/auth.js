import axios from "axios"

const API_URL = 'https://vue-ecommerce-app-2lu4.onrender.com/auth/login'

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}`, { email, password })
    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    return { success: true, user }
  }
  catch (error) {
    return {
      success: false,
      message: 'Login Fail'
    }
  }
}


