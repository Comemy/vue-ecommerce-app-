<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { adminOrderStore } from '@/stores/admin/order'

import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()
const aOrderStore = adminOrderStore()
const id = Number(route.params.id)
const orderData = ref(null)



onMounted(() => {
  orderData.value = aOrderStore.list.find(order => order.id == id)
})

</script>

<template>
  <AdminLayout>
    <div class="flex pt-8 px-6">
      <div class="card w-full p-6 bg-base-100 shadow-xl">
        <div class="flex justify-between">
          <h1 class="text-3xl font-bold">Order detail id: {{ id }}</h1>
          <RouterLink to="/admin/orders" class="btn btn-natural mt-2">
            Back
          </RouterLink>
        </div>

        <div class="divider"></div>
        <div class="flex mb-2">
          <div class="flex-1">
            <div class="font-bold">Order date</div>
            <div>{{ orderData?.createdAt }}</div>
          </div>
          <div class="flex-1">
            <div class="font-bold">Order Number</div>
            <div>{{ orderData?.orderNumber }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="flex-1">
            <div class="font-bold">Payment method</div>
            <div>{{ orderData?.paymentMethod }}</div>
          </div>
          <div class="flex-1">
            <div class="font-bold">Address</div>
            <div>{{ orderData?.address }}</div>
          </div>
        </div>
        <div class="divider"></div>
        <div v-for="(product, index) in orderData?.products" class="flex items-center my-2" :key="index">
          <div>
            <img class="w-24" :src="product.imageUrl" />
          </div>
          <div class="flex-1 ml-4">
            <div class="font-bold">{{ product.name }}</div>
            <div>{{ product?.description }}</div>
          </div>
          <div class="flex-1">จำนวน {{ product.quantity }} ชิ้น</div>
          <div>{{ product?.price }} ฿</div>
        </div>
        <div class="divider"></div>
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ราคาสินค้าทั้งหมด</div>
          <div>{{ orderData?.totalPrice }} ฿</div>
        </div>
        <div class="flex justify-end">
        </div>
      </div>
    </div>
  </AdminLayout>
</template>