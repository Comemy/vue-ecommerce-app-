<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import { onMounted, ref, reactive, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { adminProductStore } from '@/stores/admin/product';

const route = useRoute()
const router = useRouter()
const aProductStore = adminProductStore()
const alertEnd = ref(false)
let mode = ref(-1)

onMounted(() => {
  aProductStore.loadProduct()
  const id = Number(route.params.id);
  const foundProduct = aProductStore.list.find((p) => p.id === id);

  if (route.path === '/admin/products/create') {
    console.log('Enter Add mode')
  }
  else if (!foundProduct) {
    console.warn("⚠️ Product not found, redirecting...");
    router.push({ name: "admin-products-list" })
  }

  else {
    mode.value = id;
    selectedProduct.name = foundProduct.name;
    selectedProduct.imageUrl = foundProduct.imageUrl;
    selectedProduct.price = foundProduct.price;
    selectedProduct.quantity = foundProduct.quantity;
    selectedProduct.about = foundProduct.about;
    selectedProduct.status = foundProduct.status;
  }
})


const editProduct = () => {
  console.log(mode.value)
  aProductStore.updateProduct(mode.value, selectedProduct)
  alertEnd.value = true
  setTimeout(() => {
    router.push({ name: 'admin-products-list' })
  }, 2000)
}

const addtoProduct = () => {
  aProductStore.addProduct(selectedProduct)
  alertEnd.value = true
  setTimeout(() => {
    router.push({ name: 'admin-products-list' })
  }, 2000)
}

let selectedProduct = reactive({
  name: '',
  imageUrl: '',
  price: 0,
  quantity: 0,
  about: '',
  status: 'open'
})

</script>

<template>

  <AdminLayout>

    <div role="alert" class="alert alert-success my-5" v-if="alertEnd">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span v-if="route.path === '/admin/products/create'">Add Product Success</span>
      <span v-else>Edit Product Success</span>
    </div>



    <div v-if="route.path === '/admin/products/create'">Add Product</div>
    <div v-else>Edit Product</div>
    <div class="divider"></div>
    <!--form grid-->
    <div class='grid grid-cols-2'>
      <div class="flex flex-col">
        <label>Name</label>
        <input type="text" class="w-5/6 border-2 border-gray-200" v-if="mode > 0" v-model="selectedProduct.name">
        <input type="text" class="w-5/6 border-2 border-gray-200" v-else v-model="selectedProduct.name">
      </div>
      <div class="flex flex-col">
        <label>Image</label>
        <input type="text" class="w-5/6 border-2 border-gray-200" v-if="route.path === '/admin/products/create'"
          v-model="selectedProduct.imageUrl">
        <input type="text" class="w-5/6 border-2 border-gray-200" v-else v-model="selectedProduct.imageUrl">
      </div>
      <div class="flex flex-col">
        <label>Price</label>
        <input type="text" class="w-5/6 border-2 border-gray-200 " v-if="route.path === '/admin/products/create'"
          v-model="selectedProduct.price">
        <input type="text" class="w-5/6 border-2 border-gray-200" v-else v-model="selectedProduct.price">
      </div>
      <div class="flex flex-col">
        <label>Quantity</label>
        <input type="text" class="w-5/6 border-2 border-gray-200" v-if="route.path === '/admin/products/create'"
          v-model="selectedProduct.quantity">
        <input type="text" class="w-5/6 border-2 border-gray-200" v-else v-model="selectedProduct.quantity">
      </div>
      <div class="flex flex-col">
        <label>About</label>
        <textarea v-if="route.path === '/admin/products/create'" placeholder="detail product"
          class="border-2 border-gray-200 w-5/6" v-model="selectedProduct.about"></textarea>
        <textarea v-else class="border-2 border-gray-200 w-5/6" v-model="selectedProduct.about"></textarea>
      </div>
    </div>

    <div class="divider"></div>

    <div class="flex flex-col w-2/4">
      <label>Status</label>
      <select class=" border-2 border-gray-200 w-5/6 " v-if="route.path === '/admin/products/create'"
        v-model="selectedProduct.status">
        <option>open </option>
        <option>closed</option>
      </select>
      <select v-else class=" border-2 border-gray-200 w-5/6 " v-model="selectedProduct.status">
        <option>open</option>
        <option>closed</option>
      </select>
    </div>

    <div class=" flex justify-end mt-15 gap-5">
      <RouterLink :to="{ name: 'admin-products-list' }">
        <button class="btn btn-ghost">Back</button>
      </RouterLink>
      <button v-if="route.path === '/admin/products/create'" class="btn btn-netarual bg-black text-white"
        @click="addtoProduct">Add</button>
      <button v-else class="btn btn-netarual bg-black text-white" @click="editProduct">Edit</button>
    </div>

  </AdminLayout>


</template>

<style scoped>
label {
  padding: 7px
}

input {
  margin: 7px;
  height: 2.5rem;
  padding-left: 1%;
}

textarea {
  margin: 7px;
  padding-top: 1%;
  padding-left: 1%;
  height: 15vh;
}

select {
  margin: 7px;
  padding: 1%
}
</style>