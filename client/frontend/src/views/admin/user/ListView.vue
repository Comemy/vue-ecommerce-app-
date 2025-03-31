<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import Table from '@/components/Table.vue';
import { adminUserStore } from '@/stores/admin/user';
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue';


const aUserStore = adminUserStore()
const tableList = ['No.', 'Name', 'Role', 'Status', 'Update At', '']

onMounted(async () => {
  await aUserStore.loadUser()
})

const disableStatus = async (id) => {
  const index = aUserStore.list.findIndex(user => user.id === id);
  if (index !== -1) {
    aUserStore.list[index].status = 'inactive'
    const userData = {
      status: aUserStore.list[index].status
    }
    await aUserStore.updateUsertoServer(userData, id)
  }
}

const enableStatus = async (id) => {
  const index = aUserStore.list.findIndex(user => user.id === id);
  if (index !== -1) {
    aUserStore.list[index].status = 'active'
    const userData = {
      status: aUserStore.list[index].status
    }
    await aUserStore.updateUsertoServer(userData, id)
  }
}
</script>

<template>

  <AdminLayout>
    <div class="text-4xl">User List</div>
    <div class="divider"></div>
    <Table :tabels="tableList">
      <tr v-for="(user, index) in aUserStore.list">
        <th>{{ index + 1 }}</th>
        <td>{{ user.name }}</td>
        <td>{{ user.role }}</td>
        <td>
          <div
            :class="['w-2/3 mx-auto rounded-lg text-sm font-bold p-1', user.status === 'active' ? 'bg-lime-400 text-green-900 ' : 'bg-red-400 text-red-900']">
            {{ user.status }}
          </div>
        </td>
        <td>{{ user.updateAt }}</td>
        <td>
          <div class='flex gap-2 justify-center'>
            <RouterLink :to="`/admin/users/update/${user.id}`">
              <button class="btn btn-ghost">EDIT</button>
            </RouterLink>
            <button :class="['btn btn-ghost', user.status === 'active' ? '' : 'hidden']"
              @click='disableStatus(user.id)'>ENABLE</button>
            <button :class="['btn btn-ghost', user.status === 'inactive' ? '' : 'hidden']"
              @click='enableStatus(user.id)'>DISABLE</button>
          </div>
        </td>
      </tr>
    </Table>

  </AdminLayout>


</template>