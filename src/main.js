import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './firebase/init'  
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Import PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import { initializeApp } from 'firebase/app'

const app = createApp(App)

// Create and use Pinia
const pinia = createPinia()
app.use(pinia)

// Configure PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// Register PrimeVue components
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)

// Use router
app.use(router)

// Mount the app
app.mount('#app')
