<!-- src/App.vue -->
<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid px-4">
        <router-link class="navbar-brand fs-3" to="/">Yiren Library</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item mx-4">
              <router-link class="nav-link fs-5" to="/">Home</router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link class="nav-link fs-5" to="/about">About</router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link class="nav-link fs-5" to="/register">Register</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container-fluid py-5 px-4">
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import JSON from './components/JSON.vue'  
import Form from './components/Form.vue'
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

.navbar {
  margin: 0;
  padding: 1.5rem 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.router-link-active {
  font-weight: bold;
  color: #42b983 !important;
}

.navbar-nav {
  align-items: center;
}

.nav-item {
  text-align: center;
}

.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b983 !important;
}

@media (max-width: 991px) {
  .navbar-collapse {
    text-align: center;
  }
  
  .nav-item {
    margin: 1rem 0;
  }

  .content-wrapper {
    padding: 0 15px;
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
