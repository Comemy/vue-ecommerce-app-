<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios';

const userNameUpdate = ref('')
const router = useRouter()
const alert = ref(false)
const API_URL = 'https://vue-ecommerce-app-2lu4.onrender.com'

const selectFile = ref(null)
const imagePreview = ref(null)
const defaultImage = ref('https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid')


onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') || null)
  if (!user) {
    imagePreview.value = 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid'
    return false
  }
  try {
    const response = await axios.get(`${API_URL}users/${user.id}`)
    console.log(response.data)
    imagePreview.value = response.data.userImgUrl
  }
  catch (error) {
    console.log('error ja')
  }
})

const handleFileUpload = async (event) => {
  selectFile.value = event.target.files[0]
  const id = JSON.parse(localStorage.getItem('user'))
  console.log(id)
}

const alertHome = async () => {
  if (selectFile.value.type === 'image/png' || selectFile.value.type === 'image/jpg' || selectFile.value.type === 'image/jpeg') {
    console.log('correct type file')
  }
  else {
    window.alert('Please upload file jpeg / png / jpg')
    return false
  }
  const user = JSON.parse(localStorage.getItem('user') || null)
  if (!user) {
    return window.alert('Please login before uploading')
  }
  const formData = new FormData()
  formData.append('image', selectFile.value)
  formData.append('userId', user.id)
  formData.append('userName', userNameUpdate.value)

  try {
    const response = await axios.post(`${API_URL}upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('server response', response.data)
  }
  catch (error) {
    console.log(error)
  }
  alert.value = true
  setTimeout(() => {
    router.push("/")
  }, 1200)
}
</script>

<template>
  <UserLayout>

    <div v-if="alert" role="alert" class="alert alert-success mt-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Update Profile Success!</span>
    </div>

    <div class="w-200 h-110 border  border-black/7 rounded-md mx-auto mt-10 text-3xl shadow-2xl">
      <div class="font-bold mt-5 ml-5">
        Your profile
      </div>
      <div class="avatar flex justify-center">
        <div class="w-40 rounded-full">
          <img :src="imagePreview || defaultImage">
        </div>
      </div>
      <div class="flex justify-center mt-2">
        <label class="btn btn-neutral cursor-pointer">
          choose file
          <input type="file" class="hidden" @change="handleFileUpload">
        </label>
        <span v-if="selectFile" id="fileName" class="text-xl my-auto ml-3">
          File name : {{ selectFile.name }}
        </span>
        <span v-else id="fileName" class="text-xl my-auto ml-3">
          No file chosen
        </span>
      </div>
      <div class="mx-7">
        <div class="font-bold text-base mt-2">Name</div>
        <input type="text" class="w-full border mt-2 mb-6 text-sm h-9 px-2" v-model='userNameUpdate'>
        <button class="btn btn-neutral w-full" @click="alertHome">Update Profile</button>
      </div>
    </div>
  </UserLayout>

</template>

<style scoped>
button.btn.btn-neutral.w-full {
  border-radius: 2px;
}
</style>