<script setup>

import { userCartStore } from '@/stores/user/cart'
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const cartStore = userCartStore()
const API_URL = 'http://localhost:5000/'
const router = useRouter()
const isLogged = ref(false)
const searchText = ref('')
const imagePreview = ref('')
const defaultImage = ref('https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid')

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    isLogged.value = true
    try {
      const response = await axios.get(`${API_URL}users/${user.id}`)
      console.log(response.data)
      imagePreview.value = response.data.userImgUrl
    }
    catch (error) {
      console.log('error ja')
    }
  }
  cartStore.loadCart()
})

const goSignUp = () => {
  router.push({ name: 'signup' })
}

const goLogin = () => {
  router.push({ name: 'user-login' })
}

const goLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('cart-items')
  cartStore.loadCart()
  isLogged.value = false
}

const handleSearch = (event) => {
  if (event.key === "Enter") {
    router.push({
      name: 'search',
      query: { q: searchText.value }
    })
      .then(() => {
        window.location.reload();
      })
  }
}

</script>

<template>
  <div class=" flex  navbar bg-base-100 shadow-sm h-25 ">
    <div class="flex-1">
      <RouterLink to="/">
        <a class="btn btn-ghost text-xl">Comemy Shop</a>
      </RouterLink>
    </div>
    <div class="flex gap-7">
      <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" v-model="searchText"
        @keydown="handleSearch" />

      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item">{{ cartStore.sumquantity }}</span>
            </div>
          </div>
          <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow ">
            <div class="card-body">
              <span class="text-lg font-bold">Cart Items :{{ cartStore.sumquantity }}</span>
              <span class="text-info">Subtotal: ${{ cartStore.sumPrice() }}</span>
              <div class="card-actions">
                <RouterLink to="/cart">
                  <button class="btn btn-primary btn-block">View cart</button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isLogged">
        <button class="btn btn-ghost" @click="goLogin">Login</button>
        <button class="btn btn-ghost" @click="goSignUp">Sign Up</button>
      </div>

      <div v-else class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" :src="imagePreview || defaultImage">
          </div>

        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <RouterLink to="/profile">
              <a class="justify-between">
                Profile
              </a>
            </RouterLink>
          </li>
          <li><a @click=goLogout>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!---main content-->
  <slot></slot>

  <footer class="flex footer sm:footer-horizontal bg-neutral text-neutral-content p-10 justify-center gap-50 mt-10">
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 class="footer-title">Legal</h6>
      <a class="link link-hover">Terms of use</a>
      <a class="link link-hover">Privacy policy</a>
      <a class="link link-hover">Cookie policy</a>
    </nav>
  </footer>
</template>
