<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()


const goLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/admin/login')

}

const isActive = (path) => computed(() => route.path.includes(path))

</script>

<template>

  <div class="flex w-full h-screen">
    <div class="flex-col w-1/4 bg-gray-200 ">
      <div class="text-5xl p-5"><b>Admin</b></div>

      <!-- nav dashboard-->
      <div class="text-xl font-bold mb-5">

        <RouterLink to='/admin/dashboard'>
          <div :class="['p-5', isActive('/admin/dashboard').value ? 'bg-black text-white' : '']">Dashboard</div>
        </RouterLink>

        <RouterLink to='/admin/products'>
          <div
            :class="['p-5', isActive('/admin/products').value || isActive('/admin/products/create').value ? 'bg-black text-white' : '']">
            Product</div>
        </RouterLink>

        <RouterLink to='/admin/orders'>
          <div :class="['p-5', isActive('/admin/orders').value ? 'bg-black text-white' : '']">Order</div>
        </RouterLink>

        <RouterLink to='/admin/users'>
          <div :class="['p-5', isActive('/admin/users').value ? 'bg-black text-white' : '']">User</div>
        </RouterLink>

        <button class='p-5' onclick="my_modal_1.showModal()">Log out</button>
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <h3 class="text-2xl font-bold">Are you sure to Log out ?</h3>
            <p class="py-4 text-lg">System will bring you to login page</p>

            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn mr-2" @click='goLogout'>Log out</button>
                <button class="btn">Back</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>

    <!-- Content Area (Dashboard) -->
    <div class="flex-grow bg-white p-10">
      <slot></slot>

    </div>
  </div>

</template>