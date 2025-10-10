<template>
    <div class="main-container">
      <header v-if="showHeader">
        <BHeader />
      </header>
  
      <main class="main-box">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>

  export default {
    name: 'App',
    computed: {
      showHeader() {

        return this.$route.name !== 'CountBookAPI'
      },
    },
  }
  </script>
  