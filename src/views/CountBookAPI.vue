<!-- src/views/CountBookAPI.vue -->
<template>
    <div class="container">
      <h1>Count Book API</h1>
  
      <button @click="getBookCount" :disabled="loading">
        {{ loading ? 'Loading...' : 'Get Book Count' }}
      </button>
  
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error" style="color:#c00">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'CountBookAPI',
    data() {
      return {
        count: null,
        error: null,
        loading: false,
      }
    },
    async mounted() {
      await this.getBookCount()
    },
    methods: {
      async getBookCount() {
        this.error = null
        this.loading = true
        try {
          const { data } = await axios.get(
            'https://us-central1-yiren-library.cloudfunctions.net/getBookCount',
            { timeout: 10000 }
          )
  
          // Support different return structures
          this.count = typeof data === 'object' && 'count' in data ? data.count : data
        } catch (e) {
          console.error(e)
          this.error = 'Error fetching book count'
          this.count = null
        } finally {
          this.loading = false
        }
      },
    },
  }
  </script>
  