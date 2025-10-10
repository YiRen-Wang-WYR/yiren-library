<template>
    <div id="app">
      <h1>Book Counter</h1>
  
      <button @click="getBookCount" :disabled="loading">
        {{ loading ? 'Loading…' : 'Get Book Count' }}
      </button>
  
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error" style="color:#d33">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'GetBookCountView',
    data() {
      return {
        count: null,
        error: null,
        loading: false,
      }
    },
    // 如果想进页面就请求，可以保留 mounted；只想点按钮才请求就删掉它
    async mounted() {
      await this.getBookCount()
    },
    methods: {
      async getBookCount() {
        this.loading = true
        this.error = null
        this.count = null
        try {
          const url = 'https://us-central1-yiren-library.cloudfunctions.net/getBookCount'
          const { data } = await axios.get(url, { timeout: 10000 })
          this.count = data?.count ?? 0
        } catch (e) {
          this.error = e?.response?.data?.error || e.message || 'Error fetching book count'
          this.count = null
          console.error(e)
        } finally {
          this.loading = false
        }
      },
    },
  }
  </script>
  