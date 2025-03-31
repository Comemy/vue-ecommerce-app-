<script setup>
import { useRouter } from 'vue-router'
import { adminUserStore } from '@/stores/admin/user'
import { reactive } from 'vue'

const aUserStore = adminUserStore()
const router = useRouter()
const userData = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user',
  status: 'active',
  updateAt: new Date().toISOString()
})

const verifyData = (userData) => {
  const errors = []
  let check = true
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(userData.email)) {
    errors.push('Email')
    check = false
  }
  if (userData.password.trim() === '') {
    errors.push('Password')
    check = false
  }

  let alert = ' '
  for (let i = 0; i < errors.length; i++) {
    alert += ' ' + errors[i] + ' ,'
  }
  alert.substring(0, alert.length - 1)
  if (check === false) {
    return window.alert('Please Check : ' + alert.substring(0, alert.length - 1))
  }
  return check
}

const goSignUp = (userData) => {
  verifyData(userData)
  aUserStore.addUsertoServer(userData)
  router.push({ name: 'home' })
}

</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">Sign Up</h2>
        <div class="mb-4">
          <div class="form-control w-full mt-4">
            <label class="label"><span class="label-text text-base-content undefined">Name</span></label><input
              type="text" placeholder="" class="input input-bordered w-full" v-model='userData.name' />
          </div>
          <div class="form-control w-full mt-4">
            <label class="label"><span class="label-text text-base-content undefined">Email</span></label><input
              type="emailId" placeholder="" class="input input-bordered w-full" v-model='userData.email' />
          </div>
          <div class="form-control w-full mt-4">
            <label class="label"><span class="label-text text-base-content undefined">Password</span></label><input
              type="password" placeholder="" class="input input-bordered w-full" v-model='userData.password' />
          </div>
        </div>
        <p class="text-center text-error mt-8"></p>
        <button class="btn mt-2 w-full btn-primary" @click="goSignUp(userData)">Sign Up</button>
      </div>
    </div>
  </div>
</template>