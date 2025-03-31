<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { userProductStore } from '@/stores/user/product';
import { userCartStore } from '@/stores/user/cart';
import Product from '@/components/icons/Product.vue';
import { onMounted } from 'vue';

const productStore = userProductStore()
const cartStore = userCartStore()

onMounted(async () => {
  await productStore.loadProduct()
})


</script>

<template>
  <UserLayout>
    <!-- Word center the website -->

    <body>
      <div class="flex flex-col items-center justify-center h-100 w-screen">
        <h1 class="font-bold text-3xl">Welcome to Comemy BookStore</h1><br>
        <div class="text-xl">Reading for better Life</div>
      </div>

      <div class="w-4/6 mx-auto">
        <div class="carousel w-full rounded-lg">
          <div id="item1" class="carousel-item w-full">
            <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp" class="w-full" />
          </div>
          <div id="item2" class="carousel-item w-full">
            <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp" class="w-full" />
          </div>
          <div id="item3" class="carousel-item w-full">
            <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp" class="w-full" />
          </div>
          <div id="item4" class="carousel-item w-full">
            <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp" class="w-full" />
          </div>
        </div>
        <div class="flex w-full justify-center gap-2 py-2">
          <a href="#item1" class="btn btn-xs">1</a>
          <a href="#item2" class="btn btn-xs">2</a>
          <a href="#item3" class="btn btn-xs">3</a>
          <a href="#item4" class="btn btn-xs">4</a>
        </div>
      </div>
      <Product :products="productStore.list">
      </Product>
    </body>
  </UserLayout>
</template>
