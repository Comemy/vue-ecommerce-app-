<script setup lang="ts">
import UserLayout from '@/layouts/UserLayout.vue'
import { userCartStore } from '@/stores/user/cart.js'
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const cartStore = userCartStore()
const router = useRouter()

const email = ref("")
const name = ref("")
const address = ref("")
const note = ref("")
const payment = ref("")

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
})

const FormData = computed(() => ({
  email: email.value,
  name: name.value,
  address: address.value,
  note: note.value,
  paymentMethod: payment.value
}))

const submitForm = () => {
  if (
    email.value.trim() &&
    name.value.trim() &&
    address.value.trim() &&
    note.value.trim() &&
    payment.value.trim()
  ) {
    cartStore.checkout(FormData.value)
  }
  else {
    return checkForm()
  }
}

const checkForm = () => {
  const errors = []
  if (!email.value) {
    errors.push('Email')
  }
  if (!name.value) {
    errors.push('Name')
  }
  if (!address.value) {
    errors.push('Address')
  }
  if (!note.value) {
    errors.push('Note')
  }
  if (!payment.value) {
    errors.push('Payment Method')
  }
  let alert = ' '
  for (let i = 0; i < errors.length; i++) {
    alert += ' ' + errors[i] + ' ,'
  }
  alert.substring(0, alert.length - 1)

  return window.alert('Please Check : ' + alert.substring(0, alert.length - 1))
}

</script>

<template>
  <UserLayout>
    <div class="text-4xl mx-35 my-5"><b>Checkout</b></div>
    <div class="flex w-5/6 mx-auto">

      <!-- flex left -->
      <div class="flex flex-col gap-5 flex-auto p-5">
        <div>Email Address</div>
        <input v-model="email" type="email" placeholder="type here" class="border border-gray-200 p-3">

        <div>Name</div>
        <input v-model="name" type="text" placeholder="type here" class="border border-gray-200 p-3">
        <div>Address</div>
        <textarea v-model="address" class="border border-gray-200 p-3 h-40" placeholder="Adress"></textarea>
        <div>Note</div>
        <input v-model="note" type="text" placeholder="type here" class="border border-gray-200 p-3">

        <div>Pick Payment Method</div>
        <select class='w-1/3 border border-gray-200 p-3' v-model='payment'>
          <option>Cash</option>
          <option>Credit Card</option>
        </select>

        <button class="mx-auto w-full mt-10 bg-black hover:bg-[#2f2f2f] text-white text-2xl rounded-md p-5"
          @click="submitForm">
          ชำระเงิน</button>

      </div>


      <!-- flex right -->
      <div class="bg-info/50 flex flex-auto w-32">
        <div class="flex-col w-full p-8">
          <ul class="list bg-base-100 rounded-box shadow-md">
            <li class="p-4 pb-2 text-xl opacity-60 tracking-wide">Summary order</li>
            <li class="list-row py-10" v-for="item, index in cartStore.items">
              <div class="text-5xl font-thin opacity-30 tabular-nums">{{ index + 1 }}</div>
              <div><img class="size-20 rounded-box" :src="item.imageUrl" /></div>
              <div class="list-col-grow">
                <div class="text-xl pb-2">{{ item.name }}</div>
                <div class="text-sm uppercase font-semibold opacity-60">จำนวน : {{ item.quantity }}</div>
                <div class="text-sm uppercase font-semibold opacity-60"> ราคารวม : {{ item.quantity * item.price }}
                </div>
              </div>
              <RouterLink to="/cart">
                <button class="btn btn-square btn-ghost" title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user-pen">
                    <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                    <path
                      d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                    <circle cx="10" cy="7" r="4" />
                  </svg>
                </button>
              </RouterLink>
            </li>
          </ul>

          <div class="divider"></div>
          <div class="flex justify-between">

            <div class="text-2xl"><b>Items Price</b></div>
            <div class="text-2xl"><b>{{ cartStore.sumPrice() }}</b></div>
          </div>
          <div class="flex justify-between devide-y pt-3">
            <div class="text-xl ">ค่าส่ง</div>
            <div class="text-xl">0</div>
          </div>
          <div class="flex justify-between devide-y pt-3">
            <div class="text-xl">Total Price</div>
            <div class="text-xl">{{ cartStore.sumPrice() }}</div>
          </div>
        </div>
      </div>
    </div>

  </UserLayout>

</template>
