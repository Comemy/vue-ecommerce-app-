<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';
import Product from '@/components/icons/Product.vue';

import { userProductStore } from '@/stores/user/product';


const route = useRoute()
const queryParam = route.query.q
const userProduct = userProductStore()
const noProduct = ref(false)

const filterProduct = () => {
  const resultFilter = userProduct.list.filter((product) => product.name.includes(queryParam))
  console.log(resultFilter)
  return resultFilter
}

onMounted(async () => {
  await userProduct.loadProduct()
  if (filterProduct().length === 0) {
    noProduct.value = true
  }

})

</script>

<template>
  <UserLayout>
    <div class="flex items-center text-3xl h-25 ml-5">Search : &nbsp;<span class="text-3xl font-bold"> {{ queryParam
    }}</span>
    </div>
    <div v-if="noProduct" class="flex justify-center items-center font-bold text-3xl">
      Product not Found
    </div>
    <Product :products="filterProduct()">

    </Product>
  </UserLayout>
</template>