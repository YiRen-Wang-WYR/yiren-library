// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/countbookapi', name: 'CountBookAPI', component: () => import('@/views/CountBookAPI.vue') },
    { path: '/weathercheck', name: 'WeatherCheck', component: () => import('@/views/WeatherView.vue') },
    { path: '/getbookcount', name: 'GetBookCount', component: () => import('@/views/GetBookCountView.vue') },
    { path: '/addbook', name: 'AddBook', component: () => import('@/views/AddBookView.vue') },
    { path: '/firelogin', name: 'firelogin', component: () => import('@/views/FirebaseSigninView.vue') },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/management',
      name: 'management',
      component: () => import('@/views/ManagementView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'login' }
  if (to.meta.requiresAdmin && !auth.isAdmin) return { name: 'home' }
})

export default router
