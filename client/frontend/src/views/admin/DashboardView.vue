<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto'
import { adminProductStore } from '@/stores/admin/product';
import { adminUserStore } from '@/stores/admin/user';
import { adminOrderStore } from '@/stores/admin/order';

const salesChart = ref(null)
const typeSalesChart = ref(null)

const aUserStore = adminUserStore()
const aProductStore = adminProductStore()
const aOrderStore = adminOrderStore()

onMounted(async () => {
  await aOrderStore.loadOrder()
  await aProductStore.loadProduct()
  await aUserStore.loadUser()

  // Bar Chart - ยอดขายรวมรายเดือน
  const monthlySales = {}

  aOrderStore.list.forEach(order => {
    const date = new Date(order.createdAt)
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' }) // เช่น "Mar 2025"

    if (!monthlySales[month]) monthlySales[month] = 0

    order.products.forEach(product => {
      monthlySales[month] += product.price * product.quantity
    })
  })

  const chartLabels = Object.keys(monthlySales)
  const salesData = Object.values(monthlySales)

  // Donut Chart - จำนวนขายแยกรายสินค้า
  const productSales = {}

  aOrderStore.list.forEach(order => {
    order.products.forEach(product => {
      if (!productSales[product.name]) productSales[product.name] = 0
      productSales[product.name] += product.quantity
    })
  })

  const donutLabels = Object.keys(productSales)
  const donutData = Object.values(productSales)

  new Chart(salesChart.value, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Sales',
        data: salesData,
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false,
    }
  }),
    new Chart(typeSalesChart.value, {
      type: 'doughnut',
      data: {
        labels: donutLabels,
        datasets: [{
          label: 'Sales',
          data: donutData,
          backgroundColor: ['rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        maintainAspectRatio: false
      }
    })

})

</script>

<template>

  <AdminLayout>
    <div class="text-4xl">Dashboard</div>

    <!--box bar dashboard-->
    <div class="flex justify-between p-5 mt-5 text-2xl mb-5">
      <!--box order dashboard-->
      <div class="relative  justify-between flex-1 border border-gray-200 p-3">
        <div class="flex-col">
          <div>Orders</div>
          <div>{{ aOrderStore.list.length }}</div>
        </div>
        <div class='absolute top-8 right-3'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="lucide lucide-dollar-sign">
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg></div>
      </div>

      <div class="relative  justify-between flex-1 border border-gray-200 p-3">
        <div class="flex-col">
          <div>Products</div>
          <div>{{ aProductStore.list.length }}</div>
        </div>
        <div class='absolute top-8 right-3'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="lucide lucide-shopping-basket">
            <path d="m15 11-1 9" />
            <path d="m19 11-4-7" />
            <path d="M2 11h20" />
            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
            <path d="M4.5 15.5h15" />
            <path d="m5 11 4-7" />
            <path d="m9 11 1 9" />
          </svg></div>
      </div>

      <div class="relative  justify-between flex-1 border border-gray-200 p-3">
        <div class="flex-col">
          <div>Users</div>
          <div>{{ aUserStore.userlist.length }}</div>
        </div>
        <div class='absolute top-8 right-3'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="lucide lucide-user-round-cog">
            <path d="M2 21a8 8 0 0 1 10.434-7.62" />
            <circle cx="10" cy="8" r="5" />
            <circle cx="18" cy="18" r="3" />
            <path d="m19.5 14.3-.4.9" />
            <path d="m16.9 20.8-.4.9" />
            <path d="m21.7 19.5-.9-.4" />
            <path d="m15.2 16.9-.9-.4" />
            <path d="m21.7 16.5-.9.4" />
            <path d="m15.2 19.1-.9.4" />
            <path d="m19.5 21.7-.4-.9" />
            <path d="m16.9 15.2-.4-.9" />
          </svg></div>
      </div>
    </div>

    <!--chart bar dashboard-->
    <div class="flex w-full">
      <div class="flex-1 w-[500px] h-[350px] p-2">
        <canvas ref="salesChart"></canvas>
      </div>

      <div class="flex-1 w-[500px] h-[350px] p-2">
        <canvas ref="typeSalesChart"></canvas>
      </div>
    </div>
  </AdminLayout>
</template>