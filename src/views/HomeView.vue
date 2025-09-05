<template>
  <div class="home">
    <h1>Welcome to Yiren Library</h1>
    <p>Your gateway to knowledge and imagination.</p>
    <div class="actions">
      <router-link to="/register" class="btn btn-primary me-2">Register Now</router-link>
      <router-link to="/about" class="btn btn-outline-primary">Learn More</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.actions {
  margin-top: 2rem;
}
</style> 