import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/user/HomeView.vue'
import Search from '@/views/user/SearchView.vue'
import Profile from '@/views/user/ProfileView.vue'
import Success from '@/views/user/SuccessView.vue'
import Checkout from '@/views/user/CheckoutView.vue'
import Cart from '@/views/user/CartView.vue'
import SignUp from '@/views/user/SignupView.vue'
import UserLogin from '@/views/user/LoginUserView.vue'

import AdminLogin from '@/views/admin/LoginView.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'

import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/login',
      name: 'user-login',
      component: UserLogin
    },

    /*  admin site */
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/products',
      name: 'admin-products-list',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate
    }, {
      path: '/admin/users/',
      name: 'admin-users-list',
      component: AdminUserList
    },
    {
      path: '/admin/users/update/:id',
      name: 'admin-users-update',
      component: AdminUserUpdate
    },
    {
      path: '/admin/orders/',
      name: 'admin-orders-list',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'admin-orders-detail',
      component: AdminOrderDetail
    }]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdminRoute = to.path.startsWith('/admin')

  if (isAdminRoute) {
    if (!user || user.role !== 'admin') {
      return next('/login')
    }
  }
  next()
})


export default router
