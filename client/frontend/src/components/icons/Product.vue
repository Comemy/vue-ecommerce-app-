<script setup>
import { defineProps } from "vue";
import { userCartStore } from "@/stores/user/cart";
import { userProductStore } from "@/stores/user/product";
import { RouterLink } from "vue-router";


const productStore = userProductStore()
const cartStore = userCartStore()

defineProps({
  products: Array
});

const addItemtoCart = (product) => {
  cartStore.addtoCart(product)
}


</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-15 bg-[#e1dedc]/15 my-7">

    <div v-for="product in products" :key="product.name"
      class="card bg-base-100 w-70 shadow-sm rounded-lg flex flex-col justify-between">
      <figure class="w-full aspect-[2/3] overflow-hidden">
        <img :src="product.imageUrl" class="w-full h-full object-cover" alt="Product Image" />
      </figure>

      <div class="card-body flex flex-col justify-between flex-grow">
        <h2 class="card-title text-base">{{ product.name }}</h2>
        <div class="card-actions justify-end mt-auto">
          <button class="btn btn-primary" @click="addItemtoCart(product)">Add to cart</button>
          <RouterLink to="/cart">
            <button class="btn btn-primary" @click="addItemtoCart(product)">Buy Now</button>
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>