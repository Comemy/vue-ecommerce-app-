<script setup lang="ts">
import UserLayout from '@/layouts/UserLayout.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { userCartStore } from '@/stores/user/cart'
import { useRoute, useRouter } from 'vue-router'

const cartStore = userCartStore()
const route = useRoute()
const order = ref(null)
const router = useRouter()

onMounted(async () => {
  const orderNumber = route.query.orderNumber
  if (!orderNumber) return // รอให้มีค่าก่อน

  const token = localStorage.getItem('token')
  if (!token) {
    return router.push('/login')
  }
  const data = await cartStore.getOrderDetail(orderNumber)
  cartStore.checkoutList = data
  order.value = data
  localStorage.removeItem('cart-items')
})

</script>

<template>
  <UserLayout>

    <div>
      <div class="flex flex-col w-4/6 mx-auto my-7">
        <div class="text-2xl"><b>Your order is Successful!</b></div>
        <p class="text-xl my-2">Hi,Pong</p>
        <p class="text-xl">เตรียมรับสินค้าได้เลย</p>
        <div class="divider"></div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div class="text-xl"><b>Order Date</b></div>
            <div>{{ cartStore.checkoutList.createdAt }}</div>
          </div>

          <div class="flex flex-col">
            <div class="text-xl"><b>Order Number</b></div>
            <div>{{ cartStore.checkoutList.orderNumber }}</div>
          </div>

          <div class="flex flex-col">
            <div class="text-xl"><b>Payment Method</b></div>
            <div>{{ cartStore.checkoutList.paymentMethod }}</div>
          </div>

          <div class="flex flex-col">
            <div class="text-xl"><b>Address</b></div>
            <div class="max-w-2xs">{{ cartStore.checkoutList.address }}</div>
          </div>
        </div>

        <div class="divider"></div>

        <!--section สินค้า-->
        <div class="flex flex-row items-center justify-between my-3 w-full"
          v-for="item in cartStore.checkoutList.products">
          <!-- รูปภาพ -->
          <div class="w-[120px] h-[180px] flex-shrink-0">
            <img :src="item.imageUrl" class="w-full h-full object-cover rounded" />
          </div>

          <!-- ชื่อสินค้า -->
          <div class="flex-1 px-4">
            <div class="text-lg font-medium ml-15">{{ item.name }}</div>
          </div>

          <!-- จำนวน -->
          <div class="flex-1 w-32 text-center">
            จำนวน : {{ item.quantity }}
          </div>

          <!-- ราคา -->
          <div class=" w-32 text-right ">
            {{ item.quantity * item.price }} Bath
          </div>
        </div>

        <div class="divider"></div>

        <!--section สรุป-->
        <div class="flex justify-between">
          <div class="text-2xl">Total Price</div>
          <div class="text-xl">{{ cartStore.checkoutList.totalPrice }}</div>
        </div>

        <div class="flex justify-between pt-3">
          <div class="text-2xl ">ค่าส่ง</div>
          <div class="text-2xl">0</div>
        </div>

        <div class="divider"></div>

        <div class="flex justify-between devide-y pt-3">
          <div class="text-2xl "><b>ราคารวม</b></div>
          <div class="text-2xl">{{ cartStore.checkoutList.totalPrice }}</div>
        </div>
        <div class="divider"></div>
        <div class="font-bold text-3xl">ขอบคุณที่ใช้บริการ</div>
      </div>
    </div>


  </UserLayout>
</template>