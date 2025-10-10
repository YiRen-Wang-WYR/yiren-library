<template>
  <div class="app-container">
    <div class="container">
      <!-- 这里根据路由是否为 CountBookAPI 决定是否渲染 Header -->
      <header
        v-if="showHeader"
        class="d-flex justify-content-between align-items-center py-3"
      >
        <router-link to="/" class="text-decoration-none">
          <h1 class="h3 m-0 text-primary">Yiren Library</h1>
        </router-link>

        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
          </li>

          <li class="nav-item" v-if="authStore.isAdmin">
            <router-link to="/management" class="nav-link" active-class="active">Management</router-link>
          </li>

          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link to="/firelogin" class="nav-link" active-class="active">Firelogin</router-link>
          </li>
          <li class="nav-item" v-else>
            <button @click="handleLogout" class="nav-link">Logout</button>
          </li>

          <li class="nav-item">
            <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
          </li>
        </ul>
      </header>
    </div>

    <main class="container-fluid py-5 px-4">
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// 是否显示 Header（当路由名不是 CountBookAPI 时显示）
const showHeader = computed(() => route.name !== 'CountBookAPI')

// 登出
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>


<style>
@import './assets/main.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #f8f9fa;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Common card styles */
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-bottom: 2rem;
}

.card-header {
  background-color: #275FDA;
  color: white;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
}

/* Common heading styles */
h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

/* Navigation styles */
.nav-pills .nav-link {
  color: #6c757d;
  font-size: 1.1rem;
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  border: none;
  background: none;
  cursor: pointer;
}

.nav-pills .nav-link:hover {
  color: #42b983;
}

.nav-pills .nav-link.active {
  background-color: #42b983;
  color: white !important;
}

/* Form styles */
.form-control:focus, .form-select:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 0.2rem rgba(66, 185, 131, 0.25);
}

.btn-primary {
  background-color: #42b983;
  border-color: #42b983;
}

.btn-primary:hover {
  background-color: #3aa876;
  border-color: #3aa876;
}

/* Responsive styles */
@media (max-width: 991px) {
  .content-wrapper {
    padding: 0 15px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .nav-pills .nav-link {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
  }
}

@media (max-width: 576px) {
  .nav-pills .nav-link {
    padding: 0.5rem 0.75rem;
    margin: 0 0.15rem;
  }
}
</style>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
