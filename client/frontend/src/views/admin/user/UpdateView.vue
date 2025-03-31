<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { adminUserStore } from '@/stores/admin/user';
import { onMounted, reactive, computed } from 'vue';
import { adminProductStore } from '@/stores/admin/product';

const aUserStore = adminUserStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id

let userData = reactive({
  name: '',
  role: '',
  status: '',
  updateAt: ''
})

const updateEachUser = async () => {
  userData.updateAt = new Date().toISOString()
  await aUserStore.updateUsertoServer(userData, id)
  router.push({ name: 'admin-users-list' })
}

</script>

<template>
  <AdminLayout>
    <div class="flex-col shadow-lg p-7 mx-10 my-5">
      <div class="text-3xl"><b>Update user id : {{ id }}</b></div>
      <div class="divider"></div>
      <div class="flex flex-col">
        <label>Name</label>
        <input type="text" class="border-2 border-gray-200 my-3" v-model="userData.name">
        <label>Role</label>
        <select class="border-2 border-gray-200 my-3" v-model="userData.role">
          <option>admin</option>
          <option>moderator</option>
          <option>user</option>
        </select>
        <label>Status</label>
        <select class="border-2 border-gray-200 my-3" v-model="userData.status">
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>
    </div>

    <div class=" flex justify-end mt-15 gap-5">
      <RouterLink :to="{ name: 'admin-users-list' }">
        <button class="btn btn-ghost">Back</button>
      </RouterLink>
      <button class="btn btn-netarual bg-black text-white" @click="updateEachUser">Update</button>
    </div>
  </AdminLayout>

</template>

<style scoped>
input {
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
  padding: 1%
}
</style>