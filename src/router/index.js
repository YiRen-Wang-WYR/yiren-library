import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue' 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/firelogin',             
      name: 'firelogin',
      component: () => import('../views/FirebaseSigninView.vue')  // ✅ 确保路径正确
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('../views/ManagementView.vue'),
      meta: { 
        requiresAuth: true,
        requiresAdmin: true
      }
    },
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router 