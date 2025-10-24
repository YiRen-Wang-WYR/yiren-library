import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue' 
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue';
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/CountBookAPI',
      name: 'CountBookAPI',
      component: CountBookAPI
    },
    {
      path: '/WeatherCheck',
      name: 'WeatherCheck',
      component: WeatherView
    },
    {
      path:'/GetBookCount',
      name:'GetBookCount',
      component:GetBookCountView
    },
    {
      path:'/addbook',
      name:'AddBook',
      component:AddBookView
    },
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