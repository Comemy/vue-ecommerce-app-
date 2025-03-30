<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { userCartStore } from '@/stores/user/cart';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const cartStore = userCartStore()
const router = useRouter()

const goCheckout = () => {
  if (cartStore.items.length === 0) {
    window.alert('You are no product in cart')
  }

  const token = localStorage.getItem('token')
  if (!token) {
    window.alert('Please Login Before Order Items')
    setTimeout(() => {
      router.push('/login')
    }, 500)
    return
  }
  if (cartStore.items.length != 0) {
    console.log(cartStore.items)
    router.push({ name: 'checkout' })
  }
}

const increaseItem = (index) => {
  if (cartStore.items[index].quantity > 0) {
    const newQuantity = cartStore.items[index].quantity + 1
    cartStore.updateQuantity(index, newQuantity)
  }
}

const decreaseItem = (index) => {
  if (cartStore.items[index].quantity != 1) {
    const newQuantity = cartStore.items[index].quantity - 1
    cartStore.updateQuantity(index, newQuantity)
  }
}

const deleteItem = (index) => {
  cartStore.removeProduct(index)
}

onMounted(() => {
  cartStore.loadCart()
})



</script>

<template>
  <UserLayout>
    <div class="flex w-5/6 mx-auto my-10">
      <!-- flex left -->
      <div class="flex flex-col gap-5 flex-auto ">
        <div v-if="cartStore.items.length == 0" class="text-center my-auto text-3xl">No Product in List</div>
        <div class="bg-neutral-content flex flex-auto w-full p-8 relative" v-for="(item, index) in cartStore.items">
          <div class="flex flex-auto w-50">
            <div class="flex w-full">
              <img :src="item.imageUrl" class="w-full h-[55vh] object-contain pl-5 pr-5">
            </div>
          </div>

          <div class="flex flex-auto w-10 ml-3">
            <div class="flex flex-col w-full h-full">
              <div class="text-2xl font-bold">{{ item.name }}</div>
              <div class="text-sm pt-3">Description :</div>
              <div class="text-sm opacity-50 pb-11 break-words">
                {{ item.about }}
              </div>
              <div class="text-sm  mt-auto">Instock</div>
            </div>
          </div>
          <div class="flex flex-auto w-10">
            <div class="flex flex-col pl-7 w-full items-center">
              <div class="absolute top-2 right-1" @click="deleteItem(index)"><svg xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>

              <div class="text-center mb-3">Quality</div>
              <div>
                <button type="button" class="bg-gray-100 w-5 border cursor-pointer"
                  @click="decreaseItem(index)">-</button>
                <input type="text" class="w-10 bg-white border border-black text-center text-orange-600"
                  v-model="item.quantity">
                <button type="button" class="bg-gray-100 w-5 border cursor-pointer"
                  @click="increaseItem(index)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- flex right -->
      <div class="bg-info/50 flex flex-auto w-32">
        <div class="flex-col w-full p-8">
          <div class="font-bold text-4xl mb-3">Order summary</div>
          <div class="flex justify-between mb-1" v-for="item in cartStore.items">

            <div class="text-xl">{{ item.name }}</div>
            <div class="text-xl">{{ (item.price) * (item.quantity) }}
            </div>
          </div>

          <div class="flex justify-between devide-y">
            <div class="text-xl">ค่าส่ง</div>
            <div class="text-xl">0</div>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between">
            <div class="text-2xl"><b>ราคาทั้งสิ้น</b></div>
            <div class="text-2xl"><b>{{ cartStore.sumPrice() }}</b></div>
          </div>
          <button class="mx-auto w-full mt-10 bg-black hover:bg-[#2f2f2f] text-white text-2xl rounded-md p-5"
            @click="goCheckout">
            ชำระเงิน</button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>