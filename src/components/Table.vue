<script setup>
import { defineProps } from 'vue';
import { adminProductStore } from '@/stores/admin/product';

const aProductStore = adminProductStore()

defineProps({
  tabels: Array
})
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <!-- head -->
      <thead class="text-center">
        <tr>
          <th v-for="label in tabels">{{ label }}</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>